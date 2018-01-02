import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import PersonCollection from './PersonCollection';
import PersonView from './PersonView';
import PersonForm from './PersonForm';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={PersonCollection} />
      <Route path="/person/:id" exact component={PersonView} />
      <Route path="/person/:id/edit" exact component={PersonForm} />
    </Switch>
  </HashRouter>
);

export default Router;
