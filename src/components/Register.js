import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import RegisterForm from '../components/forms/registerform';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/registerActions';

class Register extends Component{
    render(){

        const { registerRequest } = this.props;
        return (
            
            <div>
            <h2> Register </h2>
            <RegisterForm registerRequest={ registerRequest }/>
            </div>
        );
    }
}

Register.propTypes = {
    registerRequest: PropTypes.func.isRequired
}

export default connect(null, { registerRequest }) (Register);
