import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('pdfjs-dist')) {
              return 'vendor-pdf';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('katex')) {
              return 'vendor-katex';
            }
            if (id.includes('three')) {
              return 'vendor-three';
            }
            if (id.includes('recharts') || id.includes('d3-') || id.includes('react-smooth')) {
              return 'vendor-charts';
            }
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/') || id.includes('/react-is/') || id.includes('react/jsx-runtime')) {
              return 'vendor-react';
            }
            return 'vendor-common';
          }
        }
      }
    }
  }
});
