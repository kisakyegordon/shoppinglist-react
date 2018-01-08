import React, {Component} from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ContentSave from 'material-ui/svg-icons/content/save';
import superagent from 'superagent';
import { BASE_URL }  from '../utilities/constants';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends Component {

    constructor(){
        super();
        this.state = {
            finished: false,
            stepIndex: 0,
            email: '',
            country_town:'',
            password:''
            };

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    

    handleNext(){
    const {stepIndex} = this.state;
    this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
    });
    }

    handlePrev(){
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
    }
    }

    onSubmit(e){
        e.preventDefault();
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        superagent
            .post(BASE_URL + 'auth/reset-password')
            .send({ email: this.state.email, country_town: this.state.country_town, password: this.state.password })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }
                console.log('password successfully reset');
                this.props.history.push('/login');
            });
    }


    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
        return (<TextField value={this.state.email} onChange={this.onChange} name="email" floatingLabelText={'Email'}/>);
        case 1:
        return (<TextField value={this.state.country_town} onChange={this.onChange} name="country_town" floatingLabelText={'Country / Town'}/>);
        case 2:
        return (<TextField value={this.state.password} onChange={this.onChange} name="password" floatingLabelText={'New Password'}/>);
        default:
        return 'You\'re a long way from home sonny jim!';
    }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
            <Stepper activeStep={stepIndex}>
            <Step>
                <StepLabel>Enter Your Email</StepLabel>
            </Step>
            <Step>
                <StepLabel>Answer Your Secret Question</StepLabel>
            </Step>
            <Step>
                <StepLabel>Enter Your New Password</StepLabel>
            </Step>
            </Stepper>

            <div className="signin">
            <div style={contentStyle}>
            {finished ? (
                <p>
                <a
                    href="#"
                    onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                    }}
                >
                    Click here
                </a> to reset the example.
                </p>
            ) : (
                <div>
                <p>{this.getStepContent(stepIndex)}</p>
                <div  className="stepper" style={{marginTop: 12}}>
                    <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{marginRight: 12}}
                    />
                    <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={stepIndex=== 2 ? this.onSubmit : this.handleNext}
                    />
                </div>
                </div>
            )}
            </div>
            </div>


        </div>
        );
    }
}

export default HorizontalLinearStepper;