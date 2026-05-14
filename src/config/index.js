import common from './common.json';
import es from './es.json';
import en from './en.json';

const pageModules = import.meta.glob('./pages/**/*.json', { eager: true });

const pages = { es: {}, en: {} };
for (const [path, mod] of Object.entries(pageModules)) {
  const parts = path.replace(/\\/g, '/').split('/');
  const lang = parts[2];
  const name = parts[3].replace('.json', '');
  pages[lang][name] = mod.default;
}

const config = {
  common,
  languages: {
    es: { ...es, pages: pages.es },
    en: { ...en, pages: pages.en }
  }
};

export default config;
