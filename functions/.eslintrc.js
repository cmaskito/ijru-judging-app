module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "object-curly-spacing": [2, "always"],
  },
  parserOptions: {
    ecmaVersion: 8, // or 2017
  },
};
