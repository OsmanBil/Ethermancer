module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jasmine: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      files: ['migrations/*.js'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
    {
      env: {
        node: true,
        "jasmine": true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
};
