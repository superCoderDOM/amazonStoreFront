// npm packages
import React from 'react';
import { Helmet } from 'react-helmet';

// components
import Item from './Item';

class ShoppingCart extends React.Component{
    render(){

        let cartItemsJSX = this.props.items.map(item=>{
            return(
                <Item key={ item.itemID } match={ this.props.match } item={ item } removeFromCart={ this.props.removeFromCart } checkout={ this.props.checkout } updateQty={ this.props.updateQty }/>
            );
        });

        let total = this.props.items.reduce((sum, item) => item.listPrice ? sum + ( parseInt(item.listPrice) * parseInt(item.qty) ) : sum, 0) / 100;

        return(
            <div className="row">
                <Helmet>
                    <title>Valkyrie | Cart</title>
                </Helmet>
                <div className="h1"> Shopping Cart </div>
                <div className="title-line justify-content-between">
                    <div className="lead">Review and edit items in your shopphing cart</div>
                    <div className="h3"> Items in cart: { this.props.items.length } </div>
                    <div className="h3"> Total: ${ total } </div>
                    <button className="btn btn-lg btn-warning" onClick={ this.props.checkout }><strong> Checkout </strong></button>
                </div>
                <div className="card-deck">
                    { cartItemsJSX }
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;