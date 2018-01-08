import React, {Component} from 'react';
import superagent from 'superagent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL } from '../utilities/constants';


class CreateList extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmitItem = this.onSubmitItem.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');
        superagent
            .post( BASE_URL + 'shoppinglists/')
            .send({ name: this.state.name, owner: user_id })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    console.log(err.status);
                    toast.error("List Already Exists");
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }
                this.props.history.push('/shoppinglists');
                toast.success("Added Successfully");
            });
    }

    onSubmitItem(e){
        e.preventDefault();
        let token = localStorage.getItem('token');
        let list_id_now = this.props.match.params.id;
        superagent
            .post(BASE_URL + 'shoppinglists/'+list_id_now+'/items/')
            .send({ name: this.state.name, list_id: list_id_now })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    console.log(err.status)
                    toast.error("Item Already Exists");
                    this.setState({ errorMessage : 'List Creation Failed'}); return;

                }
                this.props.history.push('/shoppinglist/'+list_id_now);
                toast.success("Added Successfully");
            });
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    checkUrl(){
        let item_url = this.props.match.params.id;
        return item_url && item_url !==0;
    }
    render(){
        {
            return(
                <div className="signin" style={{minHeight:'200px', marginTop: '75px'}}>
                    <ToastContainer 
                        autoClose={2000}
                        hideProgressBar={true}
                    />

                    {this.checkUrl()? 
                        <div>
                        <h3> Enter List Item Name </h3>
                            <form onSubmit={this.onSubmitItem}>
                                <div style={{display:'inline-block', marginBottom: '30px' }}>
                                <TextField value={this.state.name} onChange={this.onChange} name="name" floatingLabelText={'Item Name'}/>
                                </div>

                                <div className="Gaga">
                                <RaisedButton onClick={this.handleBack} label="Cancel" labelPosition="after" />
                                <RaisedButton type="submit" primary={true} label="Save" labelPosition="after" icon={<ContentSave/>}/>
                                </div>
                            </form>  
                        </div>  
                    :
                        <div>
                            <h3> Enter List Name </h3>
                            <form onSubmit={this.onSubmit}>
                                <div style={{display:'inline-block', marginBottom: '30px' }}>
                                <TextField value={this.state.name} onChange={this.onChange} name="name" floatingLabelText={'List Name'}/>
                                </div>
                                <div className="Gaga">
                                <RaisedButton onClick={this.handleBack} label="Cancel" labelPosition="after" />
                                <RaisedButton type="submit" primary={true} label="Save" labelPosition="after" icon={<ContentSave/>}/>
                                </div>
                            </form>  
                        </div>  
                    }
                </div>
    
            );
        }
    }
}

export default CreateList;



