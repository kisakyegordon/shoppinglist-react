import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('token') ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
        }} />
      )
    )} />
  );
  
  export default PrivateRoute;
