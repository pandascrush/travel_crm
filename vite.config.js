import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/travel_crm_frontend/",
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@mui/x-data-grid']
  }
});