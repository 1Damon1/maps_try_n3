module.exports = {
  devServer: {
    port: 8081, // если вы действительно запускаете фронт на 8081
    proxy: {
      '^/api': {              // все запросы, начинающиеся с /api
        target: process.env.VUE_APP_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
};

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1ed760',
            'body-background': '#121212',
            'component-background': '#181818',
            // …и все остальные переменные для dark-mode
          },
          javascriptEnabled: true,
        }
      }
    }
  }
}
