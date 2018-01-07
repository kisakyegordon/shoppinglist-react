import React, { Component } from 'react';
import LoginForm from '../components/forms/loginform';
import Paper from 'material-ui/Paper';

class Login extends Component{

    render (){
        return (
            <div>
            <div className="signin" >
            <h1> Log in </h1>
            <LoginForm />
            </div>
            </div>
        );
    }

}

export default Login;