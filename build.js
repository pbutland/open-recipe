const { build } = require('esbuild');

build({
  entryPoints: ['src/index.tsx'],
  outfile: 'dist/bundle.js',
  bundle: true,
  target: 'esnext',
  minify: true,
}).catch(() => process.exit(1));
