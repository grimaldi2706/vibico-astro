const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(findFiles(file));
    } else { 
      if (file.endsWith('.astro') || file.endsWith('.mdx') || file.endsWith('.js') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = findFiles('src');
let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('config.json')) {
    const updated = content.replace(/["'](\.\.\/)*config\.json["']/g, (match, prefix) => {
      // match could be "../config.json", so prefix is "../"
      return '"' + (prefix || "") + 'config/index.js"';
    });
    if (content !== updated) {
      fs.writeFileSync(file, updated);
      console.log('Updated imports in', file);
      count++;
    }
  }
}
console.log('Finished updating', count, 'files.');
