/* config-overrides.js */
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireBabelPolyfills=require('react-app-rewire-polyfills');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireReactHotLoader(config, env);
  config=rewireBabelPolyfills(config,env);
  return config;
}