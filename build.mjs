import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const versionInfo = JSON.parse(await fs.readFile(path.join(root, 'version.json'), 'utf8'));

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, 'src'), { recursive: true });

for (const file of ['index.html', 'metadata.json', 'package.json', 'version.json']) {
  await fs.copyFile(path.join(root, file), path.join(dist, file));
}
await fs.copyFile(path.join(root, 'src', 'measurement.mjs'), path.join(dist, 'src', 'measurement.mjs'));

console.log(`Zipspeed v${versionInfo.version} static build created in dist/`);
