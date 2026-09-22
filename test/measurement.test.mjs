import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateThroughput,
  calculateMedian,
  calculateJitter,
  calculateProbeFailPct,
  parseCloudflareMetadata,
  isResultEligibleForHistory,
  calculateNeedleAngle
} from '../src/measurement.mjs';

test('throughput uses bytes and elapsed milliseconds', () => {
  assert.equal(calculateThroughput(10_000_000, 1000), 80);
  assert.equal(calculateThroughput(100, 0), null);
});

test('median and HTTP jitter use measured samples', () => {
  assert.equal(calculateMedian([30, 10, 20]), 20);
  assert.equal(calculateJitter([10, 12, 15]), 2.5);
  assert.equal(calculateProbeFailPct(1, 4), 25);
});

test('metadata keeps edge colo separate from client area', () => {
  const meta = parseCloudflareMetadata({
    clientIp: '198.51.100.2',
    asn: 64500,
    asOrganization: 'Example ISP',
    colo: 'BKK',
    city: 'Ayutthaya',
    country: 'TH'
  });
  assert.equal(meta.serverColo, 'BKK');
  assert.equal(meta.serverLocation, 'Edge colo: BKK');
  assert.equal(meta.clientArea, 'Ayutthaya • TH');
  assert.equal(meta.clientAsn, 'AS64500 • Example ISP');
});

test('history accepts only complete real numeric results', () => {
  const result = {
    completed: true,
    aborted: false,
    down: 100,
    up: 20,
    ping: 15,
    jitter: 2,
    probeFailPct: 0,
    timestamp: new Date().toISOString()
  };
  assert.equal(isResultEligibleForHistory(result), true);
  assert.equal(isResultEligibleForHistory({ ...result, down: 0 }), false);
  assert.equal(isResultEligibleForHistory({ ...result, completed: false }), false);
});

test('needle angle is deterministic', () => {
  assert.equal(calculateNeedleAngle(0), 145);
  assert.equal(calculateNeedleAngle(1000), 395);
});
