import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Expense Tracker",
        short_name: "ExpenseTracker",
        description: "Track daily expenses",
        theme_color: "#242424",
        icons: [
          { src: "icon-64.png", sizes: "64x64", type: "image/png" },
          { src: "icon-128.png", sizes: "128x128", type: "image/png" },
          { src: "icon-256.png", sizes: "256x256", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
