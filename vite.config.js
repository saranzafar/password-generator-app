import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Password Generator',
        short_name: 'PasswordGen',
        description: 'A simple app to generate random passwords.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: "/path/to/ss1.png",
            sizes: "967x526",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/path/to/ss2.png",
            sizes: "967x526",
            type: "image/png",
            form_factor: "narrow"
          }
        ]
      }
    })],
})

