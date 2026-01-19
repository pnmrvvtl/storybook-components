import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
    {
        ignores: ['dist', 'storybook-static', 'node_modules', '**/.storybook/**', '*.config.ts', '*.config.js']
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsparser
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react-refresh/only-export-components': 'off'
        }
    },
    {
        files: ['**/*.test.tsx', '**/*.stories.tsx'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
            'react-refresh/only-export-components': 'off'
        }
    }
]
