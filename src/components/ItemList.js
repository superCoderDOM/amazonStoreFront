// npm packages
import React from 'react';
import { Helmet } from 'react-helmet';

// components
import Item from './Item';

class ItemList extends React.Component{
    render(){
        const itemsJSX = this.props.items.map(item=>{
            return(
                <Item key={ item.itemID } match={ this.props.match } item={ item } addToCart={ this.props.addToCart } />
            );
        });  

        return(
            <div>
                <Helmet>
                    <title>Valkyrie | Shop</title>
                </Helmet>
                <div className="row">
                    <h1> ItemList </h1>
                </div>
                <div className="row">
                    <div className="card-deck">
                        { itemsJSX }
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemList;