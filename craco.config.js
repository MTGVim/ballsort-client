const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  eslint: {
    enable: false,
  },
  babel: {
    plugins: [
      process.env.NODE_ENV !== 'production' && 'babel-plugin-styled-components',
    ].filter(Boolean),
  },
  webpack: {
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
    },
  },
};
