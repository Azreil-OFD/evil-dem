// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },

  },
  ssr: false,
  css: [
    '~/assets/css/global.scss'
  ],
  modules: ['@nuxt/test-utils/module', 'nuxt-openapi-docs-module'],
  openApiDocs: {
        folder: './docs',
        name: 'Api Docs',
        debug: true,
        list: true,
        footer: '<div><b>Nuxt OpenApi doc panel</b> - [<a href="https://on-org.github.io/nuxt-openapi-docs-module/docs/petstore-extended/components">Example</a>] [<a href="https://github.com/on-org/nuxt-openapi-docs-module">Info</a>] by <a href="https://github.com/s00d">s00d</a></div>',
        files: function () {
            return {
                auth: 'auth',
            };
        },
    },
});

