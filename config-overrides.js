/* config-overrides.js */
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireBabelPolyfills=require('react-app-rewire-polyfills');
const {getBabelLoader}=require('react-app-rewired');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config = rewireReactHotLoader(config, env);

  const loader=getBabelLoader(config.module.rules);
  loader.options.babelrc=true;
  
  config=rewireBabelPolyfills(config,env);
  
  return config;
}