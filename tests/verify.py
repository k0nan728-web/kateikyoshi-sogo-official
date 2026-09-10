"""Structural regression checks. This intentionally does NOT claim browser QA."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json, struct

ROOT = Path(__file__).resolve().parents[1]
class Document(HTMLParser):
    def __init__(self):
        super().__init__(); self.tags=[]
    def handle_starttag(self,tag,attrs): self.tags.append((tag,dict(attrs)))
d=Document(); d.feed((ROOT/'index.html').read_text())
tags=d.tags
counts={
 'header':sum(t=='header' for t,a in tags),
 'lesson-photo':sum(a.get('data-qa')=='lesson-photo' for t,a in tags),
 'first-section':sum(a.get('data-qa')=='first-section' for t,a in tags),
 'promises-section':sum(a.get('data-qa')=='promises-section' for t,a in tags),
 'comparison-cta':sum(a.get('data-qa')=='comparison-cta' for t,a in tags),
 'direct-contract':sum(a.get('data-qa')=='direct-contract' for t,a in tags),
 'h1':sum(t=='h1' for t,a in tags),
}
assert all(v==1 for v in counts.values()), counts
ids=[a['id'] for t,a in tags if 'id' in a]
assert len(ids)==len(set(ids)), 'Duplicate ids'
ordered=[a['data-qa'] for t,a in tags if 'data-qa' in a]
assert ordered==['lesson-photo','first-section','promises-section','comparison-cta','direct-contract'], ordered
assert sum(t=='table' and a.get('class')=='price-table' for t,a in tags)==15
assert sum(t=='section' and a.get('id')=='voices' for t,a in tags)==1
assets=[]
for tag,a in tags:
    href=a.get('href','')
    if href.startswith('#'):assert href[1:] in ids, href
    if tag in ('img','source'):
        path=ROOT/'public'/a['src'].lstrip('/')
        assert path.is_file() and path.stat().st_size>0,path
        asset={'path':a['src'],'bytes':path.stat().st_size}
        if tag=='img':
            b=path.read_bytes()
            if b[:8]==b'\x89PNG\r\n\x1a\n':
                w,h=struct.unpack('>II',b[16:24])
            else:
                assert b[:2]==b'\xff\xd8', 'Unsupported image bytes'
                pos=2
                while pos<len(b):
                    assert b[pos]==255
                    marker=b[pos+1];size=int.from_bytes(b[pos+2:pos+4],'big')
                    if marker in (192,193,194):
                        h,w=struct.unpack('>HH',b[pos+5:pos+9]);break
                    pos+=size+2
                else:raise AssertionError('JPEG dimensions not found')
            assert w==int(a['width']) and h==int(a['height'])
            assert a.get('alt','').strip()
            asset.update(width=w,height=h)
        assets.append(asset)
    if href.startswith('https:'):assert urlparse(href).netloc and not href.startswith('https://https')
for slug in ['eiken','gyakuten','bansou','retry','hikaku']:assert (ROOT/'public'/slug/'index.html').is_file()
js=(ROOT/'site.js').read_text();css=(ROOT/'site.css').read_text()
assert 'MutationObserver' not in js and '.innerHTML' not in js and '.remove()' not in js
assert 'overflow:hidden' not in css.replace(' ','') and 'object-fit:cover' not in css.replace(' ','')
report={'structural_regressions':'PASS','counts':counts,'assets_on_disk':assets,'course_price_tables':15,
 'browser_QA':'NOT_RUN: browser could not reach the supervised preview (ERR_BLOCKED_BY_CLIENT)',
 'required_widths':[320,360,375,390,430,568,667,736,768,810,820,844,1024,1180,1280,1366,1440,1536,1920],
 'overflow_result':'UNKNOWN — no rendered viewport was tested',
 'publication_gate':'BLOCKED until browser visual and interaction QA passes'}
(ROOT/'QA_REPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
