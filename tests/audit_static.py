"""Browser-free source checks only: no layout, screen-reader or HTTP claims."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, parse_qs
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


class Node:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.children = []
        self.content = []

    def text(self):
        return ''.join(x.text() if isinstance(x, Node) else x for x in self.content).strip()

    def find(self, tag):
        return [n for c in self.children for n in ([c] if c.tag == tag else []) + c.find(tag)]


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node()
        self.stack = [self.root]
        self.nodes = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, attrs, self.stack[-1])
        self.stack[-1].children.append(node)
        self.stack[-1].content.append(node)
        self.nodes.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.stack[-1].content.append(data)


doc = Document((ROOT / 'index.html').read_text())
nodes = doc.nodes
ids = {n.attrs['id']: n for n in nodes if 'id' in n.attrs}


class StaticAudit(unittest.TestCase):
    def test_seo_review_safety(self):
        self.assertEqual(next(n for n in nodes if n.tag == 'html').attrs['lang'], 'ja')
        self.assertEqual(len(doc.root.find('h1')), 1)
        self.assertTrue(doc.root.find('title')[0].text())
        metas = {n.attrs.get('name', n.attrs.get('property')): n.attrs.get('content')
                 for n in nodes if n.tag == 'meta'}
        self.assertTrue(metas['description'])
        self.assertIn('noindex', metas['robots'])  # Review only, NOT production SEO approval.
        self.assertNotIn('user-scalable=no', metas['viewport'])
        self.assertNotIn('maximum-scale=1', metas['viewport'])
        canonical = [n.attrs['href'] for n in nodes if n.attrs.get('rel') == 'canonical']
        self.assertEqual(canonical, ['https://kateikyoshi-sogo.com/'])
        self.assertEqual(metas['og:url'], canonical[0])
        for n in nodes:
            if n.attrs.get('type') == 'application/ld+json':
                data = json.loads(n.text())
                self.assertEqual(data['url'], canonical[0])
                self.assertNotIn('aggregateRating', data)
                self.assertNotIn('award', data)

    def test_links_and_aria_references(self):
        self.assertEqual(len(ids), sum('id' in n.attrs for n in nodes))
        for n in nodes:
            for attr in ['aria-controls', 'aria-labelledby', 'aria-describedby', 'for']:
                for ref in n.attrs.get(attr, '').split():
                    self.assertIn(ref, ids, (attr, ref))
            if n.tag != 'a':
                continue
            href = n.attrs.get('href', '')
            self.assertTrue(href and (n.text() or n.attrs.get('aria-label')), href)
            if href.startswith('#'):
                self.assertIn(href[1:], ids)
            else:
                self.assertIn(urlparse(href).scheme, ['https', 'mailto'], href)
            if n.attrs.get('target') == '_blank':
                self.assertIn('noopener', n.attrs.get('rel', '').split())
            self.assertFalse(n.find('a') or n.find('button'), 'Nested interactive link')

    def test_controls_have_labels(self):
        for n in nodes:
            if n.tag in ['input', 'select']:
                parent = n.parent
                while parent and parent.tag != 'label':
                    parent = parent.parent
                labels = [l for l in nodes if l.tag == 'label' and l.attrs.get('for') == n.attrs.get('id')]
                self.assertTrue(parent or labels or n.attrs.get('aria-label'), n.attrs)
            if n.tag == 'button':
                self.assertTrue(n.text() or n.attrs.get('aria-label'))
                self.assertEqual(n.attrs.get('type'), 'button')
        self.assertEqual(ids['estimate-total'].attrs.get('aria-live'), 'polite')

    def test_disclosures_and_price_table_semantics(self):
        details = doc.root.find('details')
        self.assertEqual(len(details), 38)
        for n in details:
            self.assertEqual(n.children[0].tag, 'summary')
            self.assertTrue(n.children[0].text())
        tables = doc.root.find('table')
        self.assertEqual(len(tables), 15)
        for n in tables:
            self.assertTrue(n.find('caption')[0].text())
            for th in n.find('th'):
                self.assertIn(th.attrs.get('scope'), ['row', 'col'])

    def test_four_distinct_brand_routes(self):
        brands = [n for n in ids['brands'].find('a') if 'brand-path' in n.attrs.get('class', '').split()]
        self.assertEqual(len(brands), 4)
        self.assertEqual({urlparse(n.attrs['href']).path for n in brands},
                         {'/eiken/', '/gyakuten/', '/bansou/', '/retry/'})
        for n in brands:
            self.assertTrue(n.find('h3')[0].text())
            self.assertEqual([x.text() for x in n.find('dt')], ['対象', '専門'])
            self.assertTrue(n.find('li'))

    def test_blog_destinations(self):
        articles = ids['journal'].find('article')
        self.assertEqual(len(articles), 3)
        slugs = set()
        for n in articles:
            url = urlparse(n.find('a')[0].attrs['href'])
            self.assertEqual(url.netloc, 'kateikyoshi-sogo.com')
            self.assertEqual(url.path, '/blog/')
            slugs.add(parse_qs(url.query)['article'][0])
            self.assertTrue(n.find('time')[0].attrs.get('datetime'))
        self.assertEqual(slugs, {'eiken-study-roadmap', 'humanities-exam-priority', 'restart-study-at-home'})

    def test_contact_and_unverified_claim_guardrails(self):
        for n in doc.root.find('a'):
            url = urlparse(n.attrs['href'])
            if url.netloc == 'docs.google.com':
                self.assertTrue(url.path.endswith('/viewform'))
                self.assertIn('/1FAIpQLSdS7FOxXb3MnoANiffjXAxZvVi4GBSIeHrVAZQ_wmkBNsz6NA/', url.path)
            self.assertNotIn(url.netloc, ['x.com', 'twitter.com', 'instagram.com', 'www.youtube.com'])
        text = ids['contact'].text()
        self.assertIn('ご相談は無料', text)
        self.assertIn('半額', text)
        for claim in ['80%超', '80％超', 'トッププロ認定', '全国No.1']:
            self.assertNotIn(claim, doc.root.text())

    def test_review_redirects(self):
        for slug in ['eiken', 'gyakuten', 'bansou', 'retry', 'hikaku']:
            page = Document((ROOT / 'public' / slug / 'index.html').read_text())
            url = f'https://kateikyoshi-sogo.com/{slug}/'
            self.assertIn(url, [n.attrs.get('href') for n in page.nodes if n.tag == 'a'])
            self.assertTrue(any(n.attrs.get('name') == 'robots' and 'noindex' in n.attrs.get('content', '') for n in page.nodes))


if __name__ == '__main__':
    unittest.main(verbosity=2)
