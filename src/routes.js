import React from 'react';
import createHashHistory from 'history/createHashHistory';
import {Provider} from 'mobx-react';
import {RouterStore,syncHistoryWithStore} from 'mobx-react-router';
import {Router,Switch,Route,Redirect} from 'react-router';

import App from './pages/App';
import NotFound from './pages/NotFound';
import Masonry from './pages/Masonry';

const hashHistory=createHashHistory();
const routerStore=new RouterStore();

const stores={
  router:routerStore
}

const history=syncHistoryWithStore(hashHistory,routerStore);

const routes=()=>{
  return (
    <Provider {...stores}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route  path="/Masonry" component={Masonry}/>
          <Route path="/404" component={NotFound}/>
          <Redirect from="*" to="/404"/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default routes;