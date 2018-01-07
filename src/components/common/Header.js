import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{


    isAuthenticated() {
        const token = localStorage.getItem('token');
        return token && token.length > 10;
    }
    render (){
        let logged = false;

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li> <NavLink to="/" activeClassName="active"> Home </NavLink> </li>
                <li> <NavLink to="/login" activeClassName="active"> Login </NavLink> </li>
                <li> <NavLink to="/register" activeClassName="active"> Register </NavLink></li> 
            </ul>
        );

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li> <NavLink to="/" activeClassName="active"> Home </NavLink> </li>
                <li> <NavLink to="/shoppinglists" activeClassName="active"> Dashboard </NavLink> </li>
                <li> <NavLink to="/logout" activeClassName="active"> Logout </NavLink> </li>
                {/* <li> <NavLink to="/reset" activeClassName="active"> Reset Password </NavLink> </li> */}
            </ul>
        );

        return (

            
            <div>
                <div>
                    <div className="top">
                    <h2>My Shopping List</h2>
                    </div>

                    <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
                    <div className="container topnav">

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    {
                        this.isAuthenticated() ? userLinks : guestLinks
                    }
                        

                    </div>
                    </div>
                    </nav>
                    </div>
            </div>
        );
    }
}

export default Header;