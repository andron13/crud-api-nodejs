module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  rules: {
    'no-var': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
