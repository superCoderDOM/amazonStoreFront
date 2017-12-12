// npm packages
import React from 'react';

class SearchBar extends React.Component{
    render(){
        return(
            <div className="navbar-nav">
                <form onSubmit={ this.props.searchAmazon } className="form-inline my-2 my-lg-0" >
                    <input type="text" className="form-control mr-sm-2" name="keywords" placeholder="Search by keywords" width="20vw" />
                    <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit"> Search </button>
                </form>
            </div>
        );
    }
}

export default SearchBar;