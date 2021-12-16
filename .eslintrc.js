module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "next", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@next/next/no-img-element": "off",
    // "@typescript-eslint/explicit-function-return-type": [
    //   "warn",
    //   {
    //     allowExpressions: true,
    //     allowConciseArrowFunctionExpressionsStartingWithVoid: true,
    //   },
    // ],
  },
};
