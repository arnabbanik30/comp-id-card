//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  ...tanstackConfig,
  {
    rules: {
      curly: ['error', 'all'],
      'import/no-cycle': 'off',
      'import/order': 'error',
      'sort-imports': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'warn',
      'pnpm/json-enforce-catalog': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      ' **/node_modules/**',
      'src/routeTree.gen.ts',
    ],
  },
];
