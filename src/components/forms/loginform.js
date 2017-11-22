import React, {Component} from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';


class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        superagent
            .post('http://127.0.0.1:5000/auth/login')
            .send({ email: this.state.email, password: this.state.password })
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'Authentication Failed'}); return;
                }
                localStorage.setItem('token', res.body.access_token );
                window.location.reload();
            });

    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    isAuthenticated(){
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }

    render(){
        const isAlreadyAuthenticated = this.isAuthenticated()
        return(
            <div>
            { isAlreadyAuthenticated ? <Redirect to={{pathname: '/shoppinglists'}} /> :  
                <form onSubmit={this.onSubmit}>
                <label> Email </label>
                <input value={this.state.email} type='text' onChange={this.onChange} name='email' />

                <label> Password </label>
                <input value={this.state.password} type='password' onChange={this.onChange} name='password' />
                <button type='submit'> Submit </button>
            
            </form> 
                }


            </div>

        );
    }
}

export default LoginForm;