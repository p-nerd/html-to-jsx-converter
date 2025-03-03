import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: "https://html-to-jsx-converter.vercel.app",
    output: "static",
    adapter: vercel({ webAnalytics: { enabled: true } }),
    integrations: [react(), sitemap()],
    vite: { plugins: [tailwindcss()] }
});
