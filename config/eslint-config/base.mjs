import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import onlyWarn from 'eslint-plugin-only-warn'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import turboPlugin from 'eslint-plugin-turbo'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import tseslint from 'typescript-eslint'

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
  }),
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ignores: ['dist/**'],
  },
  {
    rules: {
      '@stylistic/max-len': [
        'warn',
        {
          code: 80,
          tabWidth: 2,
          ignoreUrls: true,
          ignoreComments: false,
        },
      ],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'never',
        },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    },
  },
]
