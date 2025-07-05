const fs = require('fs');
const path = require('path');

const MARKDOWN_DIR = path.join(__dirname, '../src/markdown');
const OUTPUT = path.join(__dirname, '../public/search-index.json');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (
      file.endsWith('.md') &&
      path.basename(file).toLowerCase() !== 'index.md' // <--- исключаем index.md
    ) {
      results.push(filePath);
    }
  });
  return results;
}

function extractHeadings(mdText) {
  const headingRegex = /^(#+)\s+(.*)$/gm;
  let match,
    headings = [];
  while ((match = headingRegex.exec(mdText)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      line: mdText.substr(0, match.index).split('\n').length,
    });
  }
  return headings;
}

function main() {
  const mdFiles = walk(MARKDOWN_DIR);
  const result = [];
  mdFiles.forEach((filePath) => {
    const relPath = path.relative(MARKDOWN_DIR, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const headings = extractHeadings(content);
    headings.forEach((h) => {
      result.push({
        file: relPath.replace(/\\/g, '/'),
        text: h.text,
        level: h.level,
        line: h.line,
      });
    });
  });
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`search-index.json создан. Заголовков: ${result.length}`);
}

main();
