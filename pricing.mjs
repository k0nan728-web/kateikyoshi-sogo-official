/** Estimate in JPY from the published 60-minute ongoing tuition rate. */
export function monthlyEstimate(rate, minutes, count, withSupport = false) {
  if (![rate, minutes, count].every(x => Number.isFinite(x) && x > 0)) {
    throw new Error('Invalid estimate inputs');
  }
  return Math.round(rate * minutes / 60 * count) + (withSupport ? 10000 : 0);
}
