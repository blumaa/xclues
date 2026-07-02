import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { generateBrandCss } from '../src/themes/generateBrandCss';

const out = resolve(import.meta.dirname, '../src/styles/brands.css');
writeFileSync(out, generateBrandCss());
console.log(`wrote ${out}`);
