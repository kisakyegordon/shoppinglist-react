import React, {Component} from 'react';
import superagent from 'superagent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ContentSave from 'material-ui/svg-icons/content/save';
import { BASE_URL }  from '../../utilities/constants';
import { ToastContainer, toast } from 'react-toastify';


class EditListItem extends Component{
    constructor(){
        super();
        this.state = {
            name: 'a'
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * At Initial Loading of the Component - make a query to the API to pick the list item name
     */
    componentDidMount(){
        let token = localStorage.getItem('token');
        let list_id = this.props.match.params.id;
        let item_id = this.props.match.params.item_id;
        superagent
            .get(BASE_URL + 'shoppinglists/'+list_id+'/items/'+item_id)
            .send({ name: this.state.name })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }
                this.setState({name:res.body.name});
            });
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    /**
     * This onSubmit method makes an API call to edit the list item
     * @param {*} e 
     */
    onSubmit(e){
        e.preventDefault();
        let token = localStorage.getItem('token');
        let list_id = this.props.match.params.id;
        let item_id = this.props.match.params.item_id;
        superagent
            .put(BASE_URL + 'shoppinglists/'+list_id+'/items/'+item_id)
            .send({ name: this.state.name })
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }

                this.props.history.push('/shoppinglist/' + list_id);
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

                    <h3> Edit Item Name </h3>
                        <form onSubmit={this.onSubmit}>
                            <div style={{display:'inline-block', marginBottom: '30px' }}>
                            <TextField value={this.state.name} placeHolder={this.state.name} onChange={this.onChange} name="name" floatingLabelText={'Item Name'}/>
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

export default EditListItem;



