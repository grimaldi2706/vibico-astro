const fs = require('fs');
const path = require('path');

const configPath = path.resolve('src/config.json');
const outDir = path.resolve('src/config');

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, 'common.json'), JSON.stringify(config.common, null, 2));

const langs = Object.keys(config.languages);

for (const lang of langs) {
  fs.writeFileSync(path.join(outDir, `${lang}.json`), JSON.stringify(config.languages[lang], null, 2));
}

let indexJs = `import common from './common.json';\n`;
for (const lang of langs) {
  indexJs += `import ${lang} from './${lang}.json';\n`;
}

indexJs += `\nconst config = {\n  common,\n  languages: {\n`;
for (let i = 0; i < langs.length; i++) {
  indexJs += `    ${langs[i]}${i < langs.length - 1 ? ',' : ''}\n`;
}
indexJs += `  }\n};\n\nexport default config;\n`;

fs.writeFileSync(path.join(outDir, 'index.js'), indexJs);

console.log('Config successfully split into modular JSON files and assembled in index.js.');
