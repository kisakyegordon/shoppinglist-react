import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route render= {function(){
            return <h4> 404 Page Not Found </h4>
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
