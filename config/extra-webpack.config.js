/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2026-02-17 08:52:03
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2026-03-18 23:05:19
 */
const singleSpaAngularWebpack =
  require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // 添加 externals 配置
  singleSpaWebpackConfig.externals = {
    ...singleSpaWebpackConfig.externals,
    'zone.js': 'Zone',
  };

  return singleSpaWebpackConfig;
};
