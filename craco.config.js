const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
    },
  },
};
