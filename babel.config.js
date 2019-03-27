module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo'
    ],
    'sourceMaps': 'inline',
    'plugins': [
      // ['@babel/plugin-proposal-decorators', { 'decoratorsBeforeExport': true }]
    ]
  }
}
