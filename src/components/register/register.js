import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import RegisterForm from './registerForm';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

class Register extends Component{
    render(){

        return (
            
            <div>
                <ToastContainer 
                    autoClose={5000}
                    hideProgressBar={true}
                />
                <div className="signin">
                    <h1> Register </h1>
                    <RegisterForm />
                </div>
            </div>
        );
    }
}

export default Register;


