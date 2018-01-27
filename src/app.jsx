import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Client } from 'boardgame.io/client';

import Login from './login.jsx';
import TicTacToe from './games/tic-tac-toe/client.jsx';

import './app.scss';

const routes = [
    {
        path: '/',
        text: 'Login',
        component: Login,
    },
    {
        path: '/tic-tac-toe',
        text: 'Tic-Tac-Toe',
        component: TicTacToe,
    }
];

const App = () => (
  <Router>
      <div className="content">
        {routes.map((route, idx) => (
          <Route
            key={idx}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </div>
  </Router>
);

export default App;
