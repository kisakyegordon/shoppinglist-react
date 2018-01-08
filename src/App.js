import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home';
import Login from './components/login/login';
import Register from './components/register/register';
import ShoppingList from './components/shoppingList';
import ShoppingListsPage from './components/shoppingListsPage';
import Logout from './components/logout';
import CreateList from './components/createList';
import EditList from './components/edit/editList';
import EditListItem from './components/edit/editListItem';
import HorizontalLinearStepper from './components/reset';
import PrivateRoute from './utilities/privateRoute';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <Route path="/shoppinglists" component={ShoppingListsPage} /> */}
          <PrivateRoute path="/shoppinglists" component={ShoppingListsPage} />
          <PrivateRoute exact path="/shoppinglist/:id" component={ShoppingList} />
          <PrivateRoute path="/shoppinglist/:id/items/:item_id" component={EditListItem} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute exact path="/newlist" component={CreateList} />
          <PrivateRoute exact path="/newlist/:id" component={CreateList} />
          <Route exact path="/reset" component={HorizontalLinearStepper} />

          <PrivateRoute exact path="/editlist/:id" component={EditList} />

          <Route render= {function(){
            return <h4> 404 Page Not Found </h4>
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
