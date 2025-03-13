module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays Prettier errors as ESLint errors
    'prettier', // Extends prettier to disable ESLint rules that conflict with Prettier
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['*.config*.ts', '*.d*.ts'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Ensure ESLint uses your Prettier configuration
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off', // Disable prop-types enforcement for TypeScript projects
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-restricted-exports': 'off', // Allow more flexibility in exports
    'import/no-extraneous-dependencies': 'off', // Disable for development comfort
  },
};
