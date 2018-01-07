import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import superagent from 'superagent';
import {Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentCreate from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Return from '../utilities/constants';
import { BASE_URL }  from '../utilities/constants';


class ShoppingList extends Component {
    constructor(){
        super();
        this.state ={
            name:'',
            item_id:'try item 1',
            item_name:'try item 2',
            search:'',
            items:[]
        };
    }

    componentDidMount(){
        
        let token = localStorage.getItem('token');
        let list_id = this.props.match.params.id;
        superagent
            .get(BASE_URL + 'shoppinglists/' +list_id)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }
                const name = res.body.list['name'];
                this.setState({name:name});
            });

        this.handleListItems();
    }

    handleNavigation(){
        this.props.history.goBack();
    }

    handleListItems(){
        let token = localStorage.getItem('token');
        let list_id = this.props.match.params.id;
        superagent
            .get(BASE_URL + 'shoppinglists/' +list_id +'/items/')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer '+token)
            .end((err, res) => {
                if(err){
                    this.setState({ errorMessage : 'List Creation Failed'}); return;
                }
                const item_name = res.body.items;
                // console.log(res.body);
                this.setState({items:item_name});
                res.body.items?  this.setState({items:item_name}) : console.log('No List Items To Retrieve');
            });
    }

    handleDelete(id) {
        let token = localStorage.getItem('token');
        let list_id = this.props.match.params.id;
        superagent
        .delete(BASE_URL + 'shoppinglists/'+list_id+'/items/'+id)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .end((err, res) => {
            if(err){
                console.log('Error While Deleting List :', err);
                this.setState({ errorMessage : 'Failed To Delete List From Server'}); 
                return;
            }
            window.location.reload();
        });
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    handleEdit = (id) => {
        let list_id_now = this.props.match.params.id;
        this.props.history.push('/shoppinglist/'+list_id_now+'/items/'+id);
        console.log(id)
    }

    handleCreate(id){
        this.props.history.push('/newlist/'+id);
    }

    getListId(){
        let list_id_now = this.props.match.params.id;
        return list_id_now;
    }



    render () {

        const divStyles = {width: '75%', margin: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop:'15px'};

        const {items,name}=this.state;

            const list_items = items.map((item, index) =>{
                return (
                    <TableRow key={item.id}>
                        <TableHeaderColumn> {index + 1} </TableHeaderColumn>
                        <TableHeaderColumn> <a> {item.Name} </a> </TableHeaderColumn>
                        <TableHeaderColumn> 
                            <FlatButton onClick={this.handleEdit.bind(this, item.id)} primary={true} label="Edit" labelPosition="after" icon={<ContentCreate/>}/>  
                            <FlatButton onClick={this.handleDelete.bind(this, item.Id)} secondary={true} label="Delete" labelPosition="after" icon={<ActionDelete/>}/>
                        </TableHeaderColumn>
                    </TableRow>
                );
            });


        

        return (

            <div>

            <div className="Gonga" style={divStyles}>
            <div style={{display:'flex', justifyContent:'end', flexDirection: 'column'}}>
            <IconButton style={{border:'1px solid #000',borderRadius: '50%'}} onClick={this.handleBack} > <ArrowBack /> </IconButton>
            </div>
            </div>

            {/* <Return /> */}

                <div className="signin2">
                <div className="top-title">

                <div> </div>

                <div className="title">

                <h1> {name} - Items </h1>
                </div>

                <div className="button">
                <p> Add Item </p>
                <FloatingActionButton mini={true} onClick={this.handleCreate.bind(this, this.getListId())}> <ContentAdd /> </FloatingActionButton>
                </div>

                </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn> No </TableHeaderColumn>
                                <TableHeaderColumn> Name </TableHeaderColumn>
                                <TableHeaderColumn> Modify </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            { this.state.items.length < 1?

                            <TableRow>
                            <TableHeaderColumn> </TableHeaderColumn>
                            <TableHeaderColumn> No Items, Add a list item </TableHeaderColumn>
                            <TableHeaderColumn> </TableHeaderColumn>
                            </TableRow>

                            :
                            list_items }
                        </TableBody>

                        {/* <TableBody>
                            {list_items}
                        </TableBody> */}
                    </Table>
                </div>
            </div>
                );
            }
    }


export default ShoppingList;