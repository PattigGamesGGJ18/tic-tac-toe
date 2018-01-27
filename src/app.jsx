import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { SecureRoute, RouteGuard } from 'react-route-guard';
import { Client } from 'boardgame.io/dist/client';

import Login from './login.jsx';
import TicTacToe from './games/tic-tac-toe/client.jsx';

import './app.scss';
import User from "./user.jsx";

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

const LoginRouteGuard = {
  shouldRoute: () => {
    console.log(User.name);
    return !!User.name;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
    };
  }


  render() {
    return (
      <Router>
        <div className="content">
          <Switch>
          <Route
              exact path='/'
              component={Login}
            />
          <SecureRoute
              exact path='/tic-tac-toe'
              component={TicTacToe}
              routeGuard={LoginRouteGuard} redirectToPathWhenFail='/'
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
