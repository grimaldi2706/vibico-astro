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

const files = findFiles('src').filter(f => !f.endsWith('fix-imports.cjs') && !f.endsWith('replace-imports.cjs') && !f.endsWith('split-config.cjs'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('config/index.js')) {
    const configPath = path.resolve('src/config/index.js');
    let relativePath = path.relative(path.dirname(path.resolve(file)), configPath);
    relativePath = relativePath.split(path.sep).join('/');
    
    if (!relativePath.startsWith('.')) {
      relativePath = './' + relativePath;
    }

    const updated = content.replace(/["'][^"']*config\/index\.js["']/g, '"' + relativePath + '"');
    
    if (content !== updated) {
      fs.writeFileSync(file, updated);
      console.log('Fixed imports in', file, '->', relativePath);
    }
  }
}
