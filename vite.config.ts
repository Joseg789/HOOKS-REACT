import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite"; //import tailwindcss from 'tailwindcss/vite"
import path from "path"; //para shadcn
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  //configuracion añadida para shadcn
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
