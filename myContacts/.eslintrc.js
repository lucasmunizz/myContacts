module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 'off',
    'class-methods-use-this': 'off',
    indent: 'off',
    'import/no-extraneous-dependencies': 'off',
    // 'no-unused-vars': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
  },
};
