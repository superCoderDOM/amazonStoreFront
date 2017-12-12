// npm packages
import React from 'react';
import { NavLink } from 'react-router-dom';

// components
import SearchBar from './SearchBar';

class NavBar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="navbar-brand"><img src="./valkyrie.png" alt=""/></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><NavLink className="nav-link" to="/"> Store </NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/cart"> Shopping Cart <span className="ml-2"> { this.props.inCart } </span></NavLink></li>
                    </ul>
                    <SearchBar searchAmazon={ this.props.searchAmazon }/>
                </div>
            </nav>
        );
    }
}

export default NavBar;