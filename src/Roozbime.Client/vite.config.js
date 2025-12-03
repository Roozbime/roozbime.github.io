import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        lib: {
            entry: [resolve(__dirname, 'wwwroot/src/index.ts'), resolve(__dirname, 'wwwroot/src/index.css')],
            formats: ["cjs"],
            name: "roozbime"
        },
        cssCodeSplit: true,
        outDir: resolve(__dirname, "wwwroot/dist"),
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    },
})