import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/Projet-ASAL-CTS-DEGP/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-visite-virtuel',
        configureServer(server) {
          server.middlewares.use('/visite-virtuel', (req: any, res: any, next: any) => {
            const reqPath = decodeURIComponent((req.url as string)?.split('?')[0] || '/');
            const filePath = path.join(__dirname, 'visite virtuel', reqPath);
            try {
              const stat = fs.statSync(filePath);
              if (stat.isDirectory()) {
                const indexPath = path.join(filePath, 'index.htm');
                if (fs.existsSync(indexPath)) {
                  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                  fs.createReadStream(indexPath).pipe(res);
                  return;
                }
              } else if (stat.isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                const contentTypes: Record<string, string> = {
                  '.html': 'text/html; charset=UTF-8',
                  '.htm': 'text/html; charset=UTF-8',
                  '.js': 'text/javascript',
                  '.json': 'application/json',
                  '.jpg': 'image/jpeg',
                  '.jpeg': 'image/jpeg',
                  '.png': 'image/png',
                  '.gif': 'image/gif',
                  '.css': 'text/css',
                  '.cur': 'image/vnd.microsoft.icon',
                  '.webmanifest': 'application/manifest+json',
                  '.manifest': 'application/manifest+json',
                };
                res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
                fs.createReadStream(filePath).pipe(res);
                return;
              }
            } catch {
              // file not found, fall through to next middleware
            }
            next();
          });

          server.middlewares.use('/video', (req: any, res: any, next: any) => {
            const reqPath = decodeURIComponent((req.url as string)?.split('?')[0] || '/');
            const filePath = path.join(__dirname, 'Video', reqPath);
            try {
              const stat = fs.statSync(filePath);
              if (stat.isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                const contentTypes: Record<string, string> = {
                  '.mp4': 'video/mp4',
                  '.webm': 'video/webm',
                  '.mov': 'video/quicktime',
                };
                res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
                res.setHeader('Accept-Ranges', 'bytes');
                const range = req.headers['range'];
                if (range) {
                  const size = stat.size;
                  const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
                  const start = parseInt(startStr, 10);
                  const end = endStr ? parseInt(endStr, 10) : size - 1;
                  res.statusCode = 206;
                  res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`);
                  res.setHeader('Content-Length', end - start + 1);
                  fs.createReadStream(filePath, { start, end }).pipe(res);
                } else {
                  res.setHeader('Content-Length', stat.size);
                  fs.createReadStream(filePath).pipe(res);
                }
                return;
              }
            } catch {
              // file not found, fall through to next middleware
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: true,
    },
  };
});
