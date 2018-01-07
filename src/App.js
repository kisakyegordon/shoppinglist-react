import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingList from './components/shoppingList';
import ShoppingListsPage from './components/shoppingListsPage';
import Logout from './components/logout';
import CreateList from './components/createList';
import EditList from './components/editList';
import EditListItem from './components/editListItem';
import HorizontalLinearStepper from './components/reset2';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shoppinglists" component={ShoppingListsPage} />
          <Route exact path="/shoppinglist/:id" component={ShoppingList} />
          <Route path="/shoppinglist/:id/items/:item_id" component={EditListItem} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/newlist" component={CreateList} />
          <Route exact path="/newlist/:id" component={CreateList} />
          <Route exact path="/reset" component={HorizontalLinearStepper} />

          <Route exact path="/editlist/:id" component={EditList} />

          <Route render= {function(){
            return <h4> 404 Page Not Found </h4>
          }} />
        </Switch>
        <Footer />

      </div>
    );
  }
}

export default App;
