import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';



class Logout extends Component{

    componentDidMount(){
        localStorage.removeItem('token');
        this.props.history.push("/login");
    }

    render(){
        return (
            <div>
                <h1> Logging Out </h1>
            </div>
        );
    }
}

export default Logout;