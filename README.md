# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Managing Environment Variables

In a this project, you can effectively manage environment variables for both production and development environments using the `.env.production` and `.env.development` files. This guide will show you how to set up environment variables specifically for Vite.js projects.

## Why Use Environment Variables?

Environment variables are essential for securely storing configuration data and environment-specific settings outside of your codebase. This practice keeps your code clean, secure, and adaptable across different environments.

## Setting Up Environment Variables in Vite.js

Follow these steps to create and use environment variables in your Vite.js project:

### 1. Create the Files

Start by creating two separate `.env` files at the root of your Vite.js project directory: `.env.production` and `.env.development`.

```plaintext
project-root/
  ├── .env.production
  ├── .env.development
  ├── ...
  └── src/
      └── ...
```

### 2. Define Environment Variables

Inside each `.env` file, define the environment-specific variables your application needs. For example:

**.env.production:**

```plaintext
VITE_API_URL=https://api.production.com
```

**.env.development:**

```plaintext
VITE_API_URL=https://api.development.com
```

### 3. Loading Environment Variables (Optional)

To load the appropriate environment variables in your Vite.js project, you'll need to use the `@rollup/plugin-replace` plugin. Vite.js uses Rollup as its underlying build tool, and this plugin allows you to replace strings in your code during the build process.

1. Install the `@rollup/plugin-replace` package:

```bash
npm install @rollup/plugin-replace --save-dev
```

2. Configure the plugin in your Vite `vite.config.js` file:

```javascript
import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    replace({
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    }),
  ],
});
```

### 4. Using Environment Variables

You can access environment variables in your Vite.js project just like regular variables:

```javascript
console.log(import.meta.env.VITE_API_URL); // Access API URL
```

## Running the Project

To run your project with the desired environment variables, use the following commands:

For development:

```bash
npm run start:dev
```

For production:

```bash
npm run start:production
```

## Conclusion

Utilizing `.env.production` and `.env.development` files in your project allows you to manage environment variables effectively. By following this guide, you can securely store and use configuration data and environment-specific settings, ensuring your project remains adaptable and secure across various environments.