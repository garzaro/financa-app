import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Força o Vite a usar sempre a mesma instância do React na node_modules
      // Isso evita o erro de "Children of undefined"
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false,
    }
  },
  build: {
    outDir: 'build',
    // Otimização para garantir que o MUI e o React não entrem em conflito de chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  }
})


//   rollupOptions: {
//     output: {
//       manualChunks(id){
//         if(id.includes('node_modules')){
//           // React e ReactDOM
//           if (id.includes('react') || id.includes('scheduler')) return 'react';
//           if (id.includes('react')) return 'react';
//           // MUI e dependências (@mui, @emotion)
//           if (id.includes('@mui') || id.includes('@emotion')) return 'mui';
//           if (id.includes('@mui')) return '@mui';
//           // PrimeReact
//           if (id.includes('primereact') || id.includes('primeicons')) return 'primereact';
//           if (id.includes('primereact')) return 'primereact';
//           // Tailwind e styled-components
//           if (id.includes('tailwind') || id.includes('styled-components')) return 'tailwind';
//           // Ícones (Lucide, Heroicons, React-icons)
//           if (id.includes('lucide') || id.includes('heroicons') || id.includes('react-icons')) return 'icons';
//           if (id.includes('axios') || id.includes('zod')) return 'utils';
//           // Utilidades (axios, zod, buffer, etc.)
//           if (
//             id.includes('axios') ||
//             id.includes('zod') ||
//             id.includes('buffer') ||
//             id.includes('path-browserify') ||
//             id.includes('stream-browserify')
//           ) return 'utils';
//           // Resto das dependências
//           return 'vendor';
//         }
//       },
//     },
//   }
