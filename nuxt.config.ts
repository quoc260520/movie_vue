// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    buildModules: [
        '@nuxt/postcss8',
        '@nuxtjs/vuetify',
    ],
    build: {
        postcss: {
            plugins: {
            tailwindcss: {},
            autoprefixer: {},
            },
        },
    },
    css: [
        '@/assets/css/main.css',
    ],
})
