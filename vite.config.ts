import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "brand/favicon.svg",
        "brand/favicon-32.png",
        "brand/apple-touch-icon.png",
        "brand/og-image.png",
        "brand/icon-192.png",
        "brand/icon-512.png",
      ],
      manifest: {
        id: "/",
        name: "HOPE Bridge for the Needy",
        short_name: "HOPE Bridge",
        description:
          "Association humanitaire à Yaoundé — aide d'urgence, santé, nutrition et protection.",
        lang: "fr",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#eeece8",
        theme_color: "#24324a",
        categories: ["lifestyle", "social"],
        icons: [
          {
            src: "brand/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "brand/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "brand/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff2,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "hope-bridge-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      // Pas de SW en local : évite page blanche après bascule HTTP/HTTPS
      devOptions: {
        enabled: false,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
