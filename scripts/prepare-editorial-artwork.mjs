import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';
import { chromium } from '@playwright/test';

// Format encoding only: preserve the generator's canvas, pixels and alpha.
// No cropping, retouching, background replacement or anatomical edits occur here.
const sourceFile = process.argv[2];
if (!sourceFile) throw new Error('Pass the local generated-asset source manifest.');
const validationFile = process.argv[3] ?? '.artifacts/editorial-artwork/asset-validation.json';
const sources = JSON.parse(await readFile(sourceFile, 'utf8'));
await mkdir('public/media/editorial', { recursive: true });
await mkdir(dirname(validationFile), { recursive: true });
const browser = await chromium.launch({ headless: true });
const output = {};
try {
  const page = await browser.newPage();
  for (const [id, source] of Object.entries(sources)) {
    if (!/^[a-z-]+$/.test(id)) throw new Error('Invalid artwork identifier.');
    const input = await readFile(source.path);
    const image = await page.evaluate(async (base64) => {
      const picture = new Image();
      picture.src = `data:image/png;base64,${base64}`;
      await picture.decode();
      const canvas = document.createElement('canvas');
      canvas.width = picture.naturalWidth;
      canvas.height = picture.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(picture, 0, 0);
      const alpha = [[0, 0], [canvas.width - 1, 0], [0, canvas.height - 1], [canvas.width - 1, canvas.height - 1]]
        .map(([x, y]) => context.getImageData(x, y, 1, 1).data[3]);
      const encoded = canvas.toDataURL('image/webp', .94);
      if (!encoded.startsWith('data:image/webp;base64,')) throw new Error('WebP encoding unavailable.');
      return { width: canvas.width, height: canvas.height, alpha, data: encoded.split(',')[1] };
    }, input.toString('base64'));
    const file = `${id}.webp`;
    const bytes = Buffer.from(image.data, 'base64');
    await writeFile(`public/media/editorial/${file}`, bytes);
    output[id] = { file, width: image.width, height: image.height, bytes: bytes.length,
      cornerAlpha: image.alpha, sha256: createHash('sha256').update(bytes).digest('hex'),
      sourceSha256: createHash('sha256').update(input).digest('hex') };
    console.log(`${id}: ${image.width}×${image.height}, ${bytes.length} bytes, corner alpha ${image.alpha.join('/')}`);
  }
} finally {
  await browser.close();
}
await writeFile(validationFile, `${JSON.stringify(output, null, 2)}\n`);
