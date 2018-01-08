import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


class Logout extends Component{

    componentDidMount(){
        localStorage.removeItem('token');
        this.props.history.push("/login");
        toast.success("Logged out Successfully");
    }

    render(){
        return (
            <div>
                <ToastContainer 
                    autoClose={2000}
                    hideProgressBar={true}
                />
                <h1> Logging Out </h1>
            </div>
        );
    }
}

export default Logout;