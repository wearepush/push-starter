module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};
