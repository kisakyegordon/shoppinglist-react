import React, { Component } from 'react';
import LoginForm from './loginForm';
import Paper from 'material-ui/Paper';
import { ToastContainer, toast } from 'react-toastify';

class Login extends Component{

    render (){
        return (
            <div>
                <ToastContainer 
                    autoClose={5000}
                    hideProgressBar={true}
                />
                <div className="signin" >
                    <h1> Log in </h1>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default Login;