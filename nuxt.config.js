const webpack = require('webpack');
export default {
  
  // Global page headers: https://go.nuxtjs.dev/config-head 
  head: {
    title: 'Доска объявлений продажи и покупки трубы бу восстановленной лежалой новой',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Хотите купить или продать трубу бу лежалую восстановленную либо новую тогда вы по адресу' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/font-awesome/css/font-awesome.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/mixins/user.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-scrollto/nuxt',
    '@nuxtjs/pwa',
    // '@ztrehagem/nuxt-thin-modal',
  ],

  manifest:{

    name: 'Trublo.ru',
    lang: 'ru',
    useWebmanifestExtension: false

  },

  axios: {
    baseURL: 'https://trublo.ru/api'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'meta.token' },
          user: { url: 'user', method: 'get', propertyName: 'data' },
          logout: { url: 'logout', method: 'post' },
          getoffers: { url: 'posts?page=2', method: 'get', propertyName: 'meta.token' },
        }
      }
    }
  },



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
 

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
    ** Run ESLint on save
    */    
    plugins: [
      new webpack.ProvidePlugin({
         $: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery',
          jQuery: 'jquery'
      })
    ],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  }
  
  
}
