import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ command, mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return defineConfig({
      build: {
        manifest: true,
        minify: mode === 'development' ? false : 'terser',
        outDir: 'dist',
        sourcemap: command === 'serve' ? 'inline' : false,
        rollupOptions: {
          output: {
            assetFileNames: 'static/[ext]/[name][extname]',
            chunkFileNames: 'static/chunks/[name].[hash].js',
            entryFileNames: 'static/js/[name].js',
          },
        },
      },
      esbuild: {
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      },
      plugins: [
        react(), 
        tsconfigPaths()
      ],
      server: {
          port: parseInt(process.env.VITE_PORT),
      },
  });
}
