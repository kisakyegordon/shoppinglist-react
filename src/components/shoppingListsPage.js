import React, { Component } from 'react';
import { connect } from 'react-redux';
import superagent from 'superagent';
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import KeyBoardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import KeyBoardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {Card} from 'material-ui/Card';
import { BASE_URL }  from '../utilities/constants';
import Divider from 'material-ui/Divider';
import { ToastContainer, toast } from 'react-toastify';


function searchingFor(search){
    return function(x){
        return x.name.toLowerCase().includes(search.toLowerCase()) || !search;
    };
}

class ShoppingListsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            search:'',
            listId:'',
            lists: [],
            next_url:'',
            prev_url:'',
            current_page: 1 || '',
            total:4
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.retrieveLists();
     }

     handleOpen = (id) => {
         this.setState({open:true});
         this.setState({listId:id})
     }

     handleClose = () => {
         this.setState({open:false});
     }

     isAuthenticated() {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }

     retrieveLists() {
        let token = localStorage.getItem('token');
        superagent
            .get(BASE_URL + 'shoppinglists/?limit=2&page='+this.state.current_page)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    console.log('Error in API call:', err);
                    this.setState({ errorMessage : 'Failed To Retrieve Lists From Server'}); 
                    return;
                }

                this.setState({lists:res.body.lists});
                this.setState({next_url:res.body.urls.next_url})
                this.setState({prev_url:res.body.urls.prev_url})
            
                res.body.lists.owner?localStorage.setItem('user_id', res.body.lists.owner):console.log("###### NO OWNER FOUND");
            });
    }


    handleEdit(id) {
        this.props.history.push('/editlist/'+id);
    }

     handleDelete = () => {
         let id = this.state.listId;
         console.log('Delete List with ID:'+id );
         let token = localStorage.getItem('token');
         superagent
            .delete(BASE_URL + 'shoppinglists/' +id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    console.log('Error While Deleting List :', err);
                    this.setState({ errorMessage : 'Failed To Delete List From Server'}); 
                    return;
                }
                
                this.retrieveLists();
                this.setState({open:false})
                toast.success("Deleted Successfully");
            });
     }

     onSubmit() {

        let token = localStorage.getItem('token');
        superagent
            .get(BASE_URL + 'shoppinglists/?q=' +this.state.search)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    console.log('Error While Deleting List :', err);
                    this.setState({ errorMessage : 'Failed To Delete List From Server'}); 
                    return;
                }
                this.setState({lists:res.body[1]});
            });
    }

    handleBack = () => {
        this.props.history.goBack();
    }

     handleCreate(){
         this.props.history.push('/newlist');
     }

     handleShoppingList(id){
         this.props.history.push('/shoppinglist/'+id);
     }

     onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    paginate_next = () =>{
        const life = (this.state.next_url.substring(36)) * 1;
        this.setState({current_page:life})
        console.log(life)
        // this.retrieveLists();
        this.componentDidMount()
        // window.location.reload()
    }

    paginate_back = () =>{
        const life = (this.state.prev_url.substring(36)) * 1;
        this.setState({current_page:life})
        console.log(life)
        // this.retrieveLists();
        this.componentDidMount()
        // window.location.reload()
    }

    render(){

        const total_lists = this.state.lists.length;
        // Search component styling
        const divStyles = {width: '75%', margin: 'auto', display: 'flex', justifyContent: 'space-between'};

        // Variable to return new rows with list state
        const ListEntry = this.state.lists.filter(searchingFor(this.state.search)).map((list, index) =>{
            return (
                <TableRow key={list.id}>
                    <TableHeaderColumn>{index + 1}</TableHeaderColumn>
                    <TableHeaderColumn><a onClick={this.handleShoppingList.bind(this, list.id)}>{list.name}</a></TableHeaderColumn>
                    <TableHeaderColumn>

                        <div>
                        <FlatButton onClick={this.handleEdit.bind(this, list.id)} primary={true} label="Edit" labelPosition="after" icon={<ContentCreate/>}/>
                        {/* <FlatButton onClick={this.handleDelete.bind(this, list.id)} secondary={true} label="Delete" labelPosition="after" icon={<ActionDelete/>}/> */}
                        <FlatButton onClick={this.handleOpen.bind(this, list.id)} secondary={true} label="Delete" labelPosition="after" icon={<ActionDelete/>}/>
                        </div>
                    </TableHeaderColumn>
                </TableRow>
            );
        });

        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
            <FlatButton label="Delete" primary={true} keyboardFocused={true} onClick={this.handleDelete} />
        ]; 

        return (
            <div>
                <ToastContainer 
                    autoClose={5000}
                    hideProgressBar={true}
                />

                <Dialog 
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    Are you sure you want to delete this list
                </Dialog>

                <div className="Gonga" style={divStyles}>
                <div style={{display:'flex', justifyContent:'end', flexDirection: 'column'}}>
                <IconButton style={{border:'1px solid #000',borderRadius: '50%'}} onClick={this.handleBack} > <ArrowBack /> </IconButton>
                </div>
                <TextField floatingLabelText="Search" value={this.state.search} onChange={this.onChange} name="search" />
                </div>

                <div className="signin2">
                    <div className="top-title">

                        <div> </div>
                        <div className="title">
                        <h1> Shopping Lists</h1>
                        </div>
                        <div className="button">
                        <div> <p>Add List</p> </div>
                        <FloatingActionButton mini={true} onClick={this.handleCreate.bind(this)}> <ContentAdd /> </FloatingActionButton>
                        </div>

                    </div>



                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>No</TableHeaderColumn>
                                <TableHeaderColumn>List Name</TableHeaderColumn>
                                <TableHeaderColumn>Modify</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        {/* Condition to return a no lists message if state is empty & list array when there are lists  */}
                        <TableBody>
                            { this.state.lists.length < 1?
                                <TableRow>
                                    <TableHeaderColumn> </TableHeaderColumn>
                                    <TableHeaderColumn> No Lists, Add a new list </TableHeaderColumn>
                                    <TableHeaderColumn> </TableHeaderColumn>
                                </TableRow>
                            :
                            ListEntry }
                        </TableBody>
                    </Table>
                <Divider />
                </Card>

                <div className="pagi">
                    {this.state.current_page < 2? '': <IconButton  onClick={this.paginate_back}> <KeyBoardArrowLeft /> </IconButton>}
                    <div className="cuRI">
                        {this.state.current_page} of {total_lists}
                    </div>
                    {this.state.current_page > total_lists? '': <IconButton  onClick={this.paginate_next}> <KeyBoardArrowRight /> </IconButton>}
                </div>

                </div>
            </div>
        );
    }
}

export default ShoppingListsPage;