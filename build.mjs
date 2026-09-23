import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const pkg = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, "src"), { recursive: true });

for (const file of ["index.html", "metadata.json", "package.json"]) {
  await fs.copyFile(path.join(root, file), path.join(dist, file));
}
for (const file of ["styles.css", "app.mjs", "measurement.mjs"]) {
  await fs.copyFile(path.join(root, "src", file), path.join(dist, "src", file));
}

console.log(`Zipspeed ${pkg.version} static build created in dist/`);
