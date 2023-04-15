const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  enable: false,
  eslint: {
    enable: false,
  },
  webpack: {
    resolve: {
      plugins: [new TsconfigPathsPlugin({})],
    },
  },
};
