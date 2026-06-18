import { cpSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

cpSync(join(root, 'visite virtuel'), join(root, 'dist', 'visite-virtuel'), { recursive: true });
console.log('visite virtuel → dist/visite-virtuel copied');
