import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import {Redirect} from 'react-router-dom';
import superagent from 'superagent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { BASE_URL, REGISTER_URL } from '../../utilities/constants';
import { ToastContainer, toast } from 'react-toastify';


class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            country_town: '',
            password: '',
            fireRedirect: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    onSubmit(e){
        e.preventDefault();

        superagent
            .post(BASE_URL + REGISTER_URL)
            .send({ email: this.state.email, country_town: this.state.country_town, password: this.state.password })
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'Authentication Failed'}); return;
                }
                console.log('res.body:', res.body);
                this.setState({fireRedirect: true});
                toast.success("Registered Successfully");
            });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        const { fireRedirect } = this.state;

        return(
            <div>
                <ToastContainer 
                    autoClose={5000}
                    hideProgressBar={true}
                />

                <form onSubmit={this.onSubmit}>
                    <div style={{display:'inline-block', marginBottom: '30px' }}>
                    <TextField value={this.state.email} onChange={this.onChange} name="email" floatingLabelText={'Email'}/>
                    <TextField value={this.state.country_town} onChange={this.onChange} name="country_town" floatingLabelText={'Country/Town'}/>
                    <TextField value={this.state.password} onChange={this.onChange} type="password" name="password" floatingLabelText={'Password'}/>
                    </div>

                    <div>
                    <RaisedButton type="submit" primary={true} label="Submit"/>
                    </div>
                </form>  

                { fireRedirect && (
                    <Redirect to={{pathname: '/login'}} />
                )}

            </div>
        );
    }
}

export default RegisterForm;