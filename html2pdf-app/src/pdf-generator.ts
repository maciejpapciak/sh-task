import * as fs from "fs";
import * as path from "path";
import * as puppeteer from "puppeteer";

export async function generatePdf(
  htmlPath: string,
  outputDir: string,
  fileName = "document"
): Promise<string> {
  const html = fs.readFileSync(path.resolve(htmlPath), "utf8");
  fs.mkdirSync(outputDir, { recursive: true });
  const pdfPath = path.join(outputDir, `${fileName}.pdf`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.emulateMediaType("screen");

  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "0mm", right: "0mm" },
  });

  await browser.close();
  return pdfPath;
}
