import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
// import reduxThunk  from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../src/reducers/index';
// import { AUTH_USER } from './actions/actionTypes';
// import Header from './components/header';
// import Welcome from './components/welcome';
// import Signin from './components/signin';
// import Signout from './components/signout';
// import Signup from './components/signup';
// import { PrivateRoute } from './components/requireAuth';
// import Feature from './components/feature';
// import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import { store } from './store/configureStore';
// import Login from './components/forms/loginform';


ReactDOM.render(
    <Provider>
        <MuiThemeProvider>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root')
);

