import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CAMBIO CLAVE: Usa '/' para que funcione en la raíz de tu dominio (vantradigital.com)
  base: "/",
})