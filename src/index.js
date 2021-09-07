import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, MemoryRouter } from "react-router-dom";

import './index.css';
import Home from './pages/home/Home';
import Game from './pages/game/Game';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.Fragment>
    <MemoryRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/jogo' component={Game} />
        
      </Switch>
    </MemoryRouter>
  </React.Fragment>,
  document.getElementById('root')
);