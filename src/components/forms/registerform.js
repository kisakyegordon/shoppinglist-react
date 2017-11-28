import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
// import superagent from 'superagent';


class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            country_town: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();

        this.props.registerRequest(this.state);
        // superagent
        //     .post('http://127.0.0.1:5000/auth/register')
        //     .send({ email: this.state.email, country_town: this.state.country_town, password: this.state.password })
        //     .end((err, res) => {
        //         if(err){
        //             this.setState({ errorMessage : 'Authentication Failed'}); return;
        //         }
        //         console.log('res.body:', res.body)
        //     });

    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                <label> Email </label>
                <input value={this.state.email} type='text' onChange={this.onChange} name='email' />
                <label> Country Town </label>
                <input value={this.state.country_town} type='text' onChange={this.onChange} name='country_town' />
                <label> Password </label>
                <input value={this.state.password} type='password' onChange={this.onChange} name='password' />

                <button type='submit'>Submit</button>
            </form>

        );
    }
}

RegisterForm.propTypes = {
    registerRequest: PropTypes.func.isRequired
}


export default RegisterForm;