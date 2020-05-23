import React from 'react'
import {Route, Switch } from 'react-router-dom';
//import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Home from '../home/Home';
import Users from '../users/Users';
import Logs from '../logs/Logs';
import Guests from '../guests/Guests';

import PrivateRoute from '../routing/PrivateRoute';
import Page404 from '../layout/Page404';

const Routes = () => {
    return (
        <section className="container">
        <Alert /> 
        <Switch>
          <Route exact path ="/login" component={Login} />
          <PrivateRoute exact path ="/home" component={Home} />
          <PrivateRoute exact path ="/users" component={Users} />
          <PrivateRoute exact path ="/logs" component={Logs} />
          <PrivateRoute exact path ="/guests" component={Guests} />
        <Route component={Page404}/>
        </Switch>
      </section>
    )
}

export default Routes
