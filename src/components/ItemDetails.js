// npm packages
import React from 'react';
import { Helmet } from 'react-helmet';

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


class ItemDetails extends React.Component{
    render(){

        let item = this.props.item;

        let itemFeatureJSX;
        if(item.feature){
            if(Array.isArray(item.feature)){
                itemFeatureJSX = item.feature.map((feature, index)=>{
                    return (
                        <li key={ index }>{ feature }</li>
                    );
                });
            }else{
                itemFeatureJSX = <li>{ item.feature }</li>                
            }
        }

        return(
            <div className="row">
                <Helmet>
                    <title>Valkyrie | Product Details</title>
                </Helmet>
                <div className="media">
                    <div className="mr-3">
                        <img src={ item.imageLargeURL } alt="" />
                        <div>
                            <button className="btn btn-secondary" onClick={ ()=>this.props.addToCart(item.itemID) }> Add To Cart </button>
                        </div>
                    </div>
                    <div className="media-body">
                        <h2> { item.title } </h2>
                        { item.manufacturer ? <p><strong> Manufacturer: </strong> { item.manufacturer } </p> : '' }
                        { item.productGroup ? <p><strong> ProductGroup: </strong> { item.productGroup } </p> : '' }
                        { item.listPriceFormatted ? <p><strong> Price: </strong> { item.listPriceFormatted } </p> : '' }
                        { item.feature ? <div><p><strong> Features: </strong></p><ul> { itemFeatureJSX } </ul></div> : '' }
                        { item.releaseDate ? <p><strong> Release Date: </strong> { item.releaseDate } </p> : '' }
                        { item.legalDisclaimer ? <p><strong> Legal Disclaimer: </strong> { item.legalDisclaimer } </p> : '' }
                        { item.itemID ? <p><strong> ASIN: </strong> { item.itemID } </p> : '' }
                        { item.itemUPC ? <p><strong> UPC: </strong> { item.itemUPC } </p> : '' }
                        <a href={ item.detailPageURL }> See more details </a>
                        {/* 
                        { item.author ? <p><strong> Author: </strong> { item.author } </p> : '' }
                        { item.binding ? <p><strong> Binding: </strong> { item.binding } </p> : '' }
                        { item.brand ? <p><strong> Brand: </strong> { item.brand } </p> : '' }
                        { item.department ? <p><strong> Department: </strong> { item.department } </p> : '' }
                        { item.publicationDate ? <p><strong> Publication Date: </strong> { item.publicationDate } </p> : '' }
                        { item.publiser ? <p><strong> Publisher: </strong> { item.publisher} </p> : '' }
                        */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemDetails;