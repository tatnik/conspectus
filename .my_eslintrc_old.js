module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  globals: {
    __IS_DEV__: true,
    'process.env': true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
  ],
  ignorePatterns: [
    "build/**",
  ],
  rules: {
    quotes: [
      0,
    ],
    "max-len": [
      "warn",
      {
        ignoreComments: true,
        code: 100,
      },
    ],
    "linebreak-style": ["error", "windows"],
    "react/jsx-indent": [
      2,
      2,
    ],
    "react/jsx-indent-props": [
      2,
      2,
    ],
    indent: [
      2,
      2,
    ],
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [
          ".js",
          ".jsx",
          ".tsx",
        ],
      },
    ],
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "no-unused-vars": "warn",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-param-reassign": "off",
  },

  overrides: [
    {
      files: [
        "**/src/**/*.{test,stories}.{ts,tsx}",
      ],
      rules: {
        "max-len": "off",
      },
    },
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default
        // use <root>/path/to/folder/tsconfig.json
        "project": "./",
      }
    },
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal"],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupExcludedImportTypes": ["react"],
        "newlines-between": "allways",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
  }
};
