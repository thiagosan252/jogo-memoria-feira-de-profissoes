import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, MemoryRouter } from "react-router-dom";

import './index.css';
import Home from './pages/home/Home';
import Game from './pages/game/Game';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/jogar' component={Game} />
        
      </Switch>
    </MemoryRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);