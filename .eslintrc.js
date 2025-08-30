module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "airbnb",                         // Airbnb 기본 룰
      "airbnb/hooks",                   // Airbnb의 React Hooks 규칙
      "airbnb-typescript",              // Airbnb + TypeScript
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",       
      "plugin:jsx-a11y/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "react", "jsx-a11y", "import"],
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // 우린 React 19.1.1버전을 사용하기 때문에 off로 해둔다
      "import/prefer-default-export": "off",
      "react/jsx-props-no-spreading": "off",
      "prettier/prettier": "warn",
    },
  };
  