module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' } },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
};
