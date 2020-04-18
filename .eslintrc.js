module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:vue/essential", "airbnb-base", "prettier", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "comma-dangle": "off",
    quotes: ["error", "double"],
    "prettier/prettier": "error",
    "arrow-parens": ["error", "as-needed"]
  }
};
