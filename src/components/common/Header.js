import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component{
    render (){
        return (
            <div>
                <div>
                    <div className="top">
                    <h2>My Shopping List</h2>
                    </div>

                    <nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
                    <div className="container topnav">
                    <div className="navbar-header">
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        
                    <ul className="nav navbar-nav navbar-right">
                    <li> <Link to='/'> Home </Link> </li>
                    <li> <Link to='/login'> Login </Link> </li>
                    <li> <Link to='/register'> Register </Link></li> 
                    <li> <Link to='/items'> View Items </Link></li> 
                    </ul>

                    </div>
                    </div>
                    </nav>
                    </div>
            </div>
        );
    }
}

export default Header;