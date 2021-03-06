import 'classlist.js';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import './styles/main.scss';
import './index.css';
import routes from './routes';
import * as serviceWorker from './serviceWorker';


const render=(Component)=>{
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
}
render(routes);

if(module.hot){
  module.hot.accept('./routes',()=>{
    const newRoute=require('./routes').default;
    render(newRoute);
  });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
