{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "plugin:jsx-a11y/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
    "jsx-a11y",
    "@tanstack/query"
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "node": {
        "paths": [
          "src"
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
    "camelcase": [
      "error",
      {
        "allow": []
      }
    ],
    "eqeqeq": "error",
    "spaced-comment": "error",
    "no-empty-interface": "off",
    "no-var-requires": "off",
    "no-duplicate-imports": "error",
    "react-hooks/rules-of-hooks": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "arrow-spacing": "error",
    "block-spacing": "error"
  },
  "env": {
    "node": true
  }
}
