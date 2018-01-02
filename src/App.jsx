import { PageHeader } from 'react-bootstrap';
import React from 'react';
import Router from './Router';

const App = () => (
  <div className="container">
    <PageHeader>React Demo UI</PageHeader>
    <main role="main">
      <Router />
    </main>
  </div>
);

export default App;
