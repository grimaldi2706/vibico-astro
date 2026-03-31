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
      if (file.endsWith('.astro') || file.endsWith('.mdx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = findFiles('src');

const replacements = {
  // text colors
  'text-neutral-900': 'text-white',
  'text-neutral-800': 'text-neutral-200',
  'text-neutral-700': 'text-neutral-300',
  'text-neutral-600': 'text-neutral-400',
  'text-slate-900': 'text-white',
  'text-slate-800': 'text-slate-200',
  'text-slate-700': 'text-slate-300',
  'text-slate-600': 'text-slate-400',
  'text-slate-500': 'text-slate-400',
  'text-gray-900': 'text-white',
  'text-gray-800': 'text-gray-200',
  'text-gray-700': 'text-gray-300',
  'text-gray-600': 'text-gray-400',
  // Backgrounds and borders
  'bg-white': 'bg-slate-800',
  'bg-gray-100': 'bg-slate-700',
  'border-neutral-200': 'border-slate-700',
  'border-gray-100': 'border-slate-700',
  'border-gray-200': 'border-slate-700'
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;

  for (const [oldClass, newClass] of Object.entries(replacements)) {
    // using regex with word boundaries to replace exact class matches
    const regex = new RegExp(\`\\\\b\${oldClass}\\\\b\`, 'g');
    updated = updated.replace(regex, newClass);
  }

  if (content !== updated) {
    fs.writeFileSync(file, updated);
    console.log('Updated colors in', file);
  }
}
