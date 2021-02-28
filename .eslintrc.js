module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-body-style': 'off',
    'no-plusplus': 'off',
    'react/prop-types': 'off',
    'class-methods-use-this': 'off',
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
  },
};
