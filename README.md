# react-scaffolding
ready project 

 ie

 [mobx] MobX 5+ requires Proxy objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4.

this.props
或者this底下的属性找不到
方案1
  "@babel/plugin-proposal-class-properties",
    ["@babel/plugin-transform-classes", {
      "loose": true
    }],
    "@babel/plugin-transform-proto-to-assign"


    方案2
    Object.setPrototypeOf = require('setprototypeof')