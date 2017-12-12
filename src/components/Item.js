// npm packages
import React from 'react';
import { Link } from 'react-router-dom';

// itemList format example
    // author: item.ItemAttributes.Author? item.ItemAttributes.Author:"",
    // binding: item.ItemAttributes.Binding? item.ItemAttributes.Binding:"",
    // brand: item.ItemAttributes.Brand? item.ItemAttributes.Brand:"",
    // department: item.ItemAttributes.Department? item.ItemAttributes.Department:"",
    // detailPageURL: item.DetailPageURL? item.DetailPageURL:"",
    // feature: item.ItemAttributes.Feature? item.ItemAttributes.Feature:"",
    // itemUPC: item.ItemAttributes.UPC? item.ItemAttributes.UPC:"",
    // itemID: item.ASIN? item.ASIN:"",
    // imageLargeURL: item.LargeImage.URL? item.LargeImage.URL:"",
    // imageMediumURL: item.MediumImage.URL? item.MediumImage.URL:"",
    // imageSmallURL: item.SmallImage.URL? item.SmallImage.URL:"",
    // legalDisclaimer: item.ItemAttributes.LegalDisclaimer? item.ItemAttributes.LegalDisclaimer:"",
    // listPrice: item.ItemAttributes.ListPrice? item.ItemAttributes.ListPrice.Amount:"",
    // listPriceFormatted: item.ItemAttributes.ListPrice? item.ItemAttributes.ListPrice.FormattedPrice:"",
    // manufacturer: item.ItemAttributes.Manufacturer? item.ItemAttributes.Manufacturer:"",
    // productGroup: item.ItemAttributes.ProductGroup? item.ItemAttributes.ProductGroup:"",
    // publicationDate: item.ItemAttributes.PublicationDate? item.ItemAttributes.PublicationDate:"",
    // publisher: item.ItemAttributes.Publisher? item.ItemAttributes.Publisher:"",
    // releaseDate: item.ItemAttributes.ReleaseDate? item.ItemAttributes.ReleaseDate:"",
    // title: item.ItemAttributes.Title? item.ItemAttributes.Title:"",

class Item extends React.Component{
    render(){
        let item = this.props.item;

        let options = [];
        for(let i = 1; i <= 30 ; i++){
            options.push(i);
        }

        let optionsJSX = options.map((option, index)=>{
           return(
                <option key={ index } value={ option } >{ option }</option>
            );
        });

        return(
            <div className="card">
                <Link to={`/item-details/${ item.itemID }`}>
                    <img className="card-img-top" src={ item.imageLargeURL } alt="" />
                </Link>
                <div className="card-body">
                    <Link to={`/item-details/${ item.itemID }`}>
                        <h4 className="card-title"> { item.title } </h4>
                    </Link>
                    <p className="card-text h5">by { item.manufacturer } </p>
                    <p className="card-text h4 mt-3"> { item.listPriceFormatted } </p>
                    {this.props.match.url !== '/cart'? 
                        <div>
                            <button className="btn btn-secondary" onClick={ ()=>this.props.addToCart(item.itemID) }> Add To Cart </button>
                        </div> :
                        <div>
                            <label className="mr-3">Quantity: </label>
                            <select value={ item.qty } name="select" onChange={ (event)=>{ this.props.updateQty(event, item.itemID) } }>
                                { optionsJSX }
                            </select>
                            <button className="btn btn-secondary" onClick={ ()=>this.props.removeFromCart(item.itemID) }> Remove Item </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Item;