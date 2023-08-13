import theme from '@nuxt/content-theme-docs'

export default theme({
  docs: {
    primaryColor: '#00cd81'
  },
  content: {
    liveEdit: false
  },
  modules: [
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'G-T3S2WB57KE',
  }
})
