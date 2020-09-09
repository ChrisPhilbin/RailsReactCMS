
module.exports = function(api) {
  var validEnv = ['development', 'test', 'production']
  var currentEnv = api.env()
  var isDevelopmentEnv = api.env('development')
  var isProductionEnv = api.env('production')
  var isTestEnv = api.env('test')

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    )
  }

  return {

    "presets": ["@babel/preset-env","@babel/preset-react"],

    // presets: [
    //   isTestEnv && [
    //     '@babel/preset-env',
    //     {
    //       targets: {
    //         node: 'current'
    //       }
    //     },'@babel/preset-react'
    //   ],
    //   (isProductionEnv || isDevelopmentEnv) && [
    //     '@babel/preset-env',
    //     {
    //       forceAllTransforms: true,
    //       useBuiltIns: 'entry',
    //       corejs: 3,
    //       modules: false,
    //       exclude: ['transform-typeof-symbol']
    //     },'@babel/preset-react'
    //   ]
    // ].filter(Boolean),
    plugins: [
      'babel-plugin-macros',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-jsx',
      isTestEnv && 'babel-plugin-dynamic-import-node',
      '@babel/plugin-transform-destructuring',
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-object-rest-spread',
        {
          useBuiltIns: true
        }
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true,
          corejs: false
        }
      ],
      [
        '@babel/plugin-transform-regenerator',
        {
          async: false
        }
      ]
    ].filter(Boolean)
  }
}