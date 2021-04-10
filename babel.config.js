module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  overrides: [
    {
      include: './src',
      presets: ['@babel/preset-react'],
      plugins: [['babel-plugin-transform-react-remove-prop-types', { removeImport: true }], 'react-hot-loader/babel'],
    },
    {
      include: './services',
      presets: ['@babel/preset-react'],
    },
  ],
};
