module.exports = {
    chainWebpack: config => {
      config.module
        .rule('vue')
        .use('vue-loader')
          .tap(options => {
            // modify the options...

            options = {
                transformAssetUrls: {
                  video: ['src', 'poster'],
                  source: 'src',
                  img: 'src',
                  image: 'xlink:href',
                  'vl-style-icon': 'src'
                }
            }
                return options
          })
    }
  }