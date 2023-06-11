module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 'es2020',
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-new': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],
    'consistent-return': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'internal',
          'type',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '@indra/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],
  },
  overrides: [
    {
      files: ['packages/apps/stack/**'],
      rules: {
        '@typescript-eslint/no-useless-constructor': 'off',
      },
    },
  ],
  ignorePatterns: ['**/cdk.out', '**/.build', '**/node_modules', '**/*.d.ts'],
}
