import React, {Component} from 'react';
import superagent from 'superagent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { BASE_URL, LOGIN_URL }  from '../../utilities/constants';
import { ToastContainer, toast } from 'react-toastify';


class EditList extends Component{
    constructor(){
        super();
        this.state = {
            name: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        let list_id = this.props.match.params.id;
        let token = localStorage.getItem('token');
        superagent
            .get( BASE_URL + 'shoppinglists/' + list_id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    console.log('Error in API call:', err);
                }
                this.setState({name:res.body.list.name});
            });
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    onSubmit(e){
        e.preventDefault();
        let token = localStorage.getItem('token');
        let list_id = this.props.match.params.id;
        superagent
            .put(BASE_URL + 'shoppinglists/' +list_id)
            .send({ name: this.state.name})
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }

                this.props.history.push('/shoppinglists');
                toast.success("Edited Successfully");
            });
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    render(){

            return(
                <div className="signin" style={{minHeight:'200px', marginTop: '75px'}}>
                    <ToastContainer 
                        autoClose={5000}
                        hideProgressBar={true}
                    />

                    <h3> Edit List Name </h3>
                    <form onSubmit={this.onSubmit}>
                        <div style={{display:'inline-block', marginBottom: '30px' }}>
                        <TextField placeHolder={this.state.name} value={this.state.name} onChange={this.onChange} name="name" />
                        </div>

                        <div className="Gaga">
                                <RaisedButton onClick={this.handleBack} label="Cancel" labelPosition="after" />
                                <RaisedButton type="submit" primary={true} label="Save" labelPosition="after" icon={<ContentSave/>}/>
                        </div>

                    </form>  
                </div>  
    
            );
    }
}

export default EditList;



