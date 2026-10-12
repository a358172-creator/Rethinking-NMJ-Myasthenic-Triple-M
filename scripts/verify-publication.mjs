import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const privatePath = /(^|\/)(e?research_sources|esearch_sources)(\/|$)|\.(docx|xlsx?|pdf)$/i;
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const badTracked = tracked.filter((file) => privatePath.test(file));
if (badTracked.length) throw new Error(`Unpublished source files are tracked: ${badTracked.join(', ')}`);

function filesAt(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = join(dir, name);
    return statSync(file).isDirectory() ? filesAt(file) : [file];
  });
}
const assets = filesAt('dist');
for (const file of assets) {
  if (privatePath.test(file)) throw new Error(`Private source file in build: ${file}`);
  if (/\.(html|js|css|json)$/i.test(file)) {
    const content = readFileSync(file, 'utf8');
    if (/research_sources\/|esearch_sources\/|Patient_ID|P38-Siu-P1|D3-13a\/b-Schneider/.test(content)) {
      throw new Error(`Private source path or patient identifier in build: ${file}`);
    }
  }
}
const html = readFileSync('dist/index.html', 'utf8');
if (!html.includes('<html lang="en">')) throw new Error('English document language missing');
console.log(`Publication boundary verified: ${assets.length} build files; no raw research documents, source paths or patient records.`);
