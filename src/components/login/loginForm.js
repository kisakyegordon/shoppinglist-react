import React, {Component, PropTypes} from 'react';
import superagent from 'superagent';
import {Redirect} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import toastr from 'toastr';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL, LOGIN_URL } from '../../utilities/constants';
import { setTimeout } from 'timers';


class LoginForm extends Component{
    constructor(props){
        
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onSubmit(e){
        e.preventDefault();
        superagent
            .post( BASE_URL + LOGIN_URL)
            .send({ email: this.state.email, password: this.state.password })
            .set('Access-Control-Allow-Origin', '*')
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'Authentication Failed'}); return;
                }
                localStorage.setItem('token', res.body.access_token );
                toast.success("Loggedin Successfully");
                this.setState({ isAuthenticated:true});
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
        const isAlreadyAuthenticated = this.isAuthenticated();
        const divStyles = {width: '100px', margin: '30px auto', display:'flex'};
        if (this.state.isAuthenticated){
            setTimeout(<Redirect to={{pathname: '/shoppinglists'}} />, 10000);
        }

        return(
            <div>
                <ToastContainer 
                    autoClose={5000}
                    hideProgressBar={true}
                />

                { isAlreadyAuthenticated ?
                    <Redirect to={{pathname: '/shoppinglists'}}/>
                    :  
                    <form onSubmit={this.onSubmit}>
                        <TextField floatingLabelText={'Email'} value={this.state.email} onChange={this.onChange} name='email'/>
                        <TextField floatingLabelText={'Password'} value={this.state.password} type='password' onChange={this.onChange} name='password' />
                        <div className="GtglAe">
                            <div className="text"> <a href="/reset">Reset Password ?</a></div>
                            <div> 
                                <RaisedButton  style={divStyles} primary={true} label="Submit" type="submit"  />
                            </div>
                        </div>
                    </form> 
                }
            </div>
        );
    }
}


export default LoginForm;



