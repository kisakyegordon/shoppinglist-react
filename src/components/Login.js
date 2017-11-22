import React, { Component } from 'react';
import LoginForm from '../components/forms/loginform';

class Login extends Component{

    render (){
        return (
            <div>
            <h2> Log in </h2>
            <LoginForm />
            </div>
        );
    }

}

export default Login;