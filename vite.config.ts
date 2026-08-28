import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const posterCapture = (): Plugin => ({
  name: 'roxana-poster-capture',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/__capture', (request, response) => {
      const slug = (request.url ?? '').replace(/^\//, '').replace(/[^a-z0-9-]/gi, '')
      if (request.method !== 'POST' || !slug) {
        response.statusCode = 400
        return response.end('bad capture request')
      }
      const chunks: Buffer[] = []
      request.on('data', (chunk) => chunks.push(chunk as Buffer))
      request.on('end', () => {
        const dataUrl = Buffer.concat(chunks).toString('utf8')
        const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1)
        const directory = resolve(process.cwd(), 'public/posters')
        mkdirSync(directory, { recursive: true })
        writeFileSync(resolve(directory, `${slug}.webp`), Buffer.from(base64, 'base64'))
        response.end(`saved ${slug}`)
      })
    })
  }
})

const spaFallback = (): Plugin => ({
  name: 'roxana-spa-fallback',
  apply: 'build',
  closeBundle() {
    const directory = resolve(process.cwd(), 'dist')
    copyFileSync(resolve(directory, 'index.html'), resolve(directory, '404.html'))
    writeFileSync(resolve(directory, '.nojekyll'), '')
  }
})

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss(), posterCapture(), spaFallback()],
  server: { port: 5174, strictPort: true }
})
