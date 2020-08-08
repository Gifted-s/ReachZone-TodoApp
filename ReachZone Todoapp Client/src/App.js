import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './Components/Home/SignUp';
import SignIn from './Components/Home/Signin';
import Dashboard from './Components/Dashboard/Dashboard';
import ThemeContext from './Components/ThemeContext/ThemeContext';

export default class App extends Component {

  render() {
    return (
      <ThemeContext>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={SignUp} exact />
            <Route path="/signin" component={SignIn} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </ThemeContext>


    )
  }
}
