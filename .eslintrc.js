module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    node: true,
    jest: true,
    browser: true,
  },
  settings: {},
  rules: {
    'import/prefer-default-export': 0,
  },
};