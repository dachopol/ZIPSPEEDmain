import fs from 'node:fs/promises';

const files = ['index.html', 'app/applet/index.html'];
const forbidden = [
  'Mock speed',
  "valPing.textContent = '12.4'",
  "valDownload.textContent = '1000.0'",
  "valUpload.textContent = '500.0'",
  "valServerLocation.textContent = 'Bangkok (BKK)'",
  "valClientIp.textContent = '203.0.113.195'",
  'Math.random()'
];

for (const file of files) {
  const text = await fs.readFile(file, 'utf8');
  for (const token of forbidden) {
    if (text.includes(token)) throw new Error(`${file}: forbidden synthetic token: ${token}`);
  }
  const stateDecls = (text.match(/let\s+isTestRunning\s*=/g) || []).length;
  if (stateDecls !== 1) throw new Error(`${file}: expected exactly one isTestRunning declaration, found ${stateDecls}`);
  if (!text.includes("from './src/measurement.mjs'")) throw new Error(`${file}: measurement module import missing`);
}

const rootMeasurement = await fs.readFile('src/measurement.mjs', 'utf8');
const appletMeasurement = await fs.readFile('app/applet/src/measurement.mjs', 'utf8');
if (rootMeasurement !== appletMeasurement) throw new Error('Root and applet measurement modules differ');

const rootHtml = await fs.readFile('index.html', 'utf8');
const appletHtml = await fs.readFile('app/applet/index.html', 'utf8');
if (rootHtml !== appletHtml) throw new Error('Root and applet index.html differ');

console.log('Audit passed: no known synthetic result flow and mirrors are synchronized.');
