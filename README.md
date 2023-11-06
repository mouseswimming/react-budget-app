# React + TypeScript + Redux Toolkit + Bootstrap

## Responsive design
### Mobile view
<img width="593" alt="image" src="https://github.com/mouseswimming/react-budget-app/assets/2342125/9c7eebce-ce37-495b-afef-d813e7efba44">

### Desktop view
<img width="1183" alt="image" src="https://github.com/mouseswimming/react-budget-app/assets/2342125/c4c73c92-6693-481e-b12b-6b25dd9af578">


## Available Script

This project was bootstrapped with [Vite](https://vitejs.dev/)

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
