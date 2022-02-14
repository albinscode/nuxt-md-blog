export default {
    components: true,
    css: [
        // Load a Node.js module directly (here it's a Sass file)
        'bulma',
        // CSS file in the project
        // '@/assets/css/main.css',
        '@/node_modules/github-markdown-css/github-markdown.css',
        // SCSS file in the project
        // '@/assets/css/main.scss'
        '@/node_modules/highlight.js/scss/arta.scss',
    ],
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    head: {
       titleTemplate: '%s - Nuxt',
       meta: [
           { charset: 'utf-8' },
           { name: 'viewport', content: 'width=device-width, initial-scale=1' },

           // hid is used as unique identifier. Do not use `vmid` for it as it will not work
           { hid: 'description', name: 'description', content: 'Meta description' }
       ]
   }
}

