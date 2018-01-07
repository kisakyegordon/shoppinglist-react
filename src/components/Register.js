import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import RegisterForm from '../components/forms/registerform';
import { connect } from 'react-redux';

class Register extends Component{
    render(){

        return (
            
            <div>
            <div className="signin">
            <h1> Register </h1>
            <RegisterForm />
            </div>
            </div>
        );
    }
}

export default Register;


