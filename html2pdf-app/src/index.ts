import path from 'path';
import { generatePdf } from './pdf-generator.js';

async function main() {
  const htmlPath = path.resolve('templates/sample.html');
  const outputDir = path.resolve('out');

  const pdfPath = await generatePdf(htmlPath, outputDir, 'sample');
  console.log('PDF saved in:', pdfPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});