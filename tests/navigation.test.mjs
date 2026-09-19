import test from 'node:test';
import assert from 'node:assert/strict';
import { focusAnchorTarget } from '../navigation.mjs';

function fixture(tabindex) {
  const attrs = new Map(tabindex === undefined ? [] : [['tabindex', tabindex]]);
  const events = new Map();
  const target = {
    hasAttribute: name => attrs.has(name),
    setAttribute: (name, value) => attrs.set(name, value),
    removeAttribute: name => attrs.delete(name),
    addEventListener: (name, fn, options) => events.set(name, { fn, options }),
    focus: options => { target.focusOptions = options; },
  };
  return { attrs, events, target, doc: { getElementById: id => id === 'pricing' ? target : null } };
}
const link = href => ({ getAttribute: () => href });

test('section receives focus without replacing native anchor scrolling', () => {
  const f = fixture();
  assert.equal(focusAnchorTarget(link('#pricing'), f.doc), true);
  assert.equal(f.attrs.get('tabindex'), '-1');
  assert.deepEqual(f.target.focusOptions, { preventScroll: true });
  assert.deepEqual(f.events.get('blur').options, { once: true });
  f.events.get('blur').fn();
  assert.equal(f.attrs.has('tabindex'), false);
});
test('existing tabindex is preserved', () => {
  const f = fixture('-1');
  focusAnchorTarget(link('#pricing'), f.doc);
  assert.equal(f.attrs.get('tabindex'), '-1');
  assert.equal(f.events.size, 0);
});
test('missing and nonlocal targets do not change focus', () => {
  const f = fixture();
  for (const href of [null, '', '#', '#missing', 'https://example.com/', 'mailto:a@example.com']) {
    assert.equal(focusAnchorTarget(link(href), f.doc), false);
  }
  assert.equal(f.target.focusOptions, undefined);
});
