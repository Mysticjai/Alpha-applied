import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        litigationservices: path.resolve(import.meta.dirname, 'litigationservices.html'),
        alphalens: path.resolve(import.meta.dirname, 'alphalens.html'),
        aiconsulting: path.resolve(import.meta.dirname, 'aiconsulting.html'),
        divorcefamilylaw: path.resolve(import.meta.dirname, 'divorcefamilylaw.html'),
        economicdamages: path.resolve(import.meta.dirname, 'economicdamages.html'),
        documentanalysis: path.resolve(import.meta.dirname, 'documentanalysis.html'),
        bankruptcyrestructuring: path.resolve(import.meta.dirname, 'bankruptcyrestructuring.html'),
        intellectualproperty: path.resolve(import.meta.dirname, 'intellectualproperty.html'),
        litigationsupport: path.resolve(import.meta.dirname, 'litigationsupport.html'),
        termsofservice: path.resolve(import.meta.dirname, 'terms-of-service.html'),
        privacypolicy: path.resolve(import.meta.dirname, 'privacy-policy.html'),
      },
    },
  },
})
