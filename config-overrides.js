/* eslint-env node */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function override(config /*, env*/) {
    // Поддержка алиасов из tsconfig.json
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin());

 // Кастомизация svg-loader'а
  config.module.rules = [
    ...config.module.rules.map((rule) => {
      if (rule.oneOf) {
        return {
          ...rule,
          oneOf: [
            {
              test: /icons\/.*\.svg$/,
              loader: 'svg-inline-loader',
            },
            ...rule.oneOf,
          ],
        };
      }
      return rule;
    }),
  ];

  return config;
};
