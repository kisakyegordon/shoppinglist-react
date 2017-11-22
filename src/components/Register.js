import React, {Component} from 'react';
import RegisterForm from '../components/forms/registerform';

class Register extends Component{
    render(){
        return (
            <div>
            <h2> Register </h2>
            <RegisterForm />
            </div>
        );
    }
}

export default Register;
