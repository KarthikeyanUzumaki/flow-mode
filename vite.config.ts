import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Flow Mode',
        short_name: 'FlowMode',
        description: 'Your all-in-one personal dashboard for tasks, finances, and mindfulness.',
        theme_color: '#1e293b',
        icons: [
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})