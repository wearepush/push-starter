// const error = 2;
// const warn = 1;
const ignore = 0;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import', 'jest', 'jsx-a11y', 'react', 'react-hooks', 'json', 'html'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        tabWidth: 2,
        bracketSpacing: true,
        trailingComma: 'es5',
        singleQuote: true,
        jsxBracketSameLine: false,
      },
    ],
    'import/prefer-default-export': ignore,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        arrow: false,
      },
    ],
    // 'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.stories.js'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/forbid-prop-types': ignore,
    'import/no-cycle': ignore,
    'global-require': ignore,
    'no-console': ignore,
    'no-underscore-dangle': ignore,
    'import/no-unresolved': ignore,
    'import/no-extraneous-dependencies': ignore,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src', 'redux'],
      },
    },
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  globals: {
    __CLIENT__: true,
    __SERVER__: true,
    FormData: true,
    localStorage: true,
    window: true,
    document: true,
  },
};
