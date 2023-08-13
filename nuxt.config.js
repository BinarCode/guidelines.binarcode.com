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
    id: 'G-Y71X62T40N',
  }
})
