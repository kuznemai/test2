// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: true,

  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/image"],

  css: ["~/assets/css/main.css"],
  image: {
    dir: "public",
    domains: ["8f5b56ca183f4214.mokky.dev"],
    format: ["webp"],
  },
  routeRules: {
    "/**": { swr: 60 },
  },
});
