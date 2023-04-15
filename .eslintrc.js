module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['better-styled-components', 'no-relative-import-paths'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // 상대경로 import 금지
    'no-relative-import-paths/no-relative-import-paths': ['error'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  ignorePatterns: ['.eslintrc.js', 'craco.config.js'],
};
