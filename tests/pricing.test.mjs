import assert from 'node:assert/strict';
import {monthlyEstimate} from '../pricing.mjs';
// Regression: the prior page incorrectly charged 60, 90 and 120 minutes equally.
assert.equal(monthlyEstimate(5500,60,4),22000);
assert.equal(monthlyEstimate(5500,90,4),33000);
assert.equal(monthlyEstimate(5500,120,4),44000);
assert.equal(monthlyEstimate(6500,90,8,true),88000);
assert.equal(monthlyEstimate(4000,60,4),16000);
assert.throws(()=>monthlyEstimate(NaN,60,4));
console.log('PASS: six price calculation checks');
