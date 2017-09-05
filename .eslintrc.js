module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    node: true,
    jest: true
  },
  settings: {},
  rules: {
    'import/prefer-default-export': 0,
  },
};