import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Patient exports stay closed until a separate, explicit publication review.
const privatePath = /(^|\/)(research_sources|esearch_sources|data_review|_processed)(\/|$)|\.(docx|xlsx?|xlsm|pdf)$|atlas\.(review|approved|provenance)(\.|$)|validation\.audit\.private/i;
// The user requested publication of this specific CV. Match both its exact path
// and contents so this exception cannot admit another research document.
const publicCvPaths = new Set(['public/cv/CV_Arturo_Lopez_EN.docx', 'dist/cv/CV_Arturo_Lopez_EN.docx']);
const publicCvHash = 'b0bfe1b6d3bd82164666e72ba31547974ade714e44f8d1de6d649c5a335d777f';
function isApprovedPublicCv(file) {
  if (!publicCvPaths.has(file)) return false;
  if (createHash('sha256').update(readFileSync(file)).digest('hex') !== publicCvHash) {
    throw new Error(`Public CV differs from the author-approved document: ${file}`);
  }
  return true;
}
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const badTracked = tracked.filter((file) => privatePath.test(file) && !isApprovedPublicCv(file));
if (badTracked.length) throw new Error(`Unpublished source files are tracked: ${badTracked.join(', ')}`);

// When the local crosswalk exists, check every actual source identifier without
// printing identifiers or making that private file a dependency of public CI.
const provenancePath = 'esearch_sources/_processed/atlas.provenance.private.json';
const sourceIds = existsSync(provenancePath)
  ? JSON.parse(readFileSync(provenancePath, 'utf8')).records.map((record) => record.sourceId)
  : [];
if (sourceIds.some((id) => typeof id !== 'string' || id.length === 0)) {
  throw new Error('Private provenance crosswalk has invalid source identifiers');
}

function filesAt(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = join(dir, name);
    return statSync(file).isDirectory() ? filesAt(file) : [file];
  });
}
const assets = filesAt('dist');
for (const file of assets) {
  if (privatePath.test(file) && !isApprovedPublicCv(file)) throw new Error(`Private source file in build: ${file}`);
  if (/\.(html|js|css|json)$/i.test(file)) {
    const content = readFileSync(file, 'utf8');
    if (/research_sources\/|esearch_sources\/|data_review\/|atlas\.review\.json|\b(?:Patient_ID|sourceId|sourceDoi|sourceRow)\b|Case\s+0[1-9]/.test(content)
      || sourceIds.some((id) => content.includes(id))) {
      throw new Error(`Private source path or patient identifier in build: ${file}`);
    }
  }
}
const html = readFileSync('dist/index.html', 'utf8');
if (!html.includes('<html lang="en">')) throw new Error('English document language missing');
console.log(`Publication boundary verified: ${assets.length} build files; no private source/export paths or patient-record markers; ${sourceIds.length} available source identifiers checked.`);
