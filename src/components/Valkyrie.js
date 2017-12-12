// npm packages
import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

// components
import ItemDetails from './ItemDetails'
import ItemList from './ItemList';
import NavBar from './NavBar';
import ShoppingCart from './ShoppingCart';

// global variables
const baseURL = '/search?keywords='
const testProducts = [
    {
        "author": "",
        "binding": "Unlocked Phone",
        "brand": "Apple",
        "department": "",
        "detailPageURL": "https://www.amazon.com/Apple-iPhone-Fully-Unlocked-5-8/dp/B075QN8NDH?psc=1&SubscriptionId=AKIAJCIQK2YC3Q5GXSEA&tag=dlacroix101-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B075QN8NDH",
        "feature": [
            "An all‑new 5.8‑inch Super Retina screen with all-screen OLED Multi-Touch display",
            "12MP wide-angle and telephoto cameras with Dual optical image stabilization",
            "Wireless Qi charging",
            "Splash, water, and dust resistant",
            "Sapphire crystal lens cover"
        ],
        "itemUPC": "",
        "itemID": "B075QN8NDH",
        "imageLargeURL": "https://images-na.ssl-images-amazon.com/images/I/41WzAKf5CSL.jpg",
        "imageMediumURL": "https://images-na.ssl-images-amazon.com/images/I/41WzAKf5CSL._SL160_.jpg",
        "imageSmallURL": "https://images-na.ssl-images-amazon.com/images/I/41WzAKf5CSL._SL75_.jpg",
        "legalDisclaimer": "",
        "listPrice": "139000",
        "listPriceFormatted": "$1,390.00",
        "manufacturer": "Apple Computer",
        "productGroup": "Wireless",
        "publicationDate": "",
        "publisher": "Apple Computer",
        "releaseDate": "",
        "title": "Apple iPhone X, Fully Unlocked 5.8\", 64 GB - Silver"
    },
    {
        "author": "",
        "binding": "Kitchen",
        "brand": "Marcato",
        "department": "",
        "detailPageURL": "https://www.amazon.com/Marcato-Machine-Stainless-Cutter-Instructions/dp/B0009U5OSO?psc=1&SubscriptionId=AKIAJCIQK2YC3Q5GXSEA&tag=dlacroix101-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B0009U5OSO",
        "feature": [
            "Marcato's Original World-Famous Atlas Pasta Machine rolls and cuts pasta dough for making traditional lasagne, fettuccine, and tagliolini at home",
            "Made in Italy from stainless steel; includes Pasta Machine, pasta cutter, hand crank, clamp, complete instructions and 10-year manufacturer's warranty",
            "Easily make 3 pasta shapes; equipped to easily attach a Pasta Drive motor or any of 12 pasta cutting accessories (sold separately)",
            "Roll dough up to 150-millimeters wide with 10 thicknesses (0.6 to 4.8-millimeter); rolled dough ensures a more consistent texture, cook time and taste",
            "Easy to use; wipe clean with a dry brush or cloth; available exclusively from HIC Harold Import Co"
        ],
        "itemUPC": "739485263814",
        "itemID": "B0009U5OSO",
        "imageLargeURL": "https://images-na.ssl-images-amazon.com/images/I/51aFXzwqY%2BL.jpg",
        "imageMediumURL": "https://images-na.ssl-images-amazon.com/images/I/51aFXzwqY%2BL._SL160_.jpg",
        "imageSmallURL": "https://images-na.ssl-images-amazon.com/images/I/51aFXzwqY%2BL._SL75_.jpg",
        "legalDisclaimer": "",
        "listPrice": "6799",
        "listPriceFormatted": "$67.99",
        "manufacturer": "Atlas",
        "productGroup": "Kitchen",
        "publicationDate": "",
        "publisher": "Atlas",
        "releaseDate": "",
        "title": "Marcato Atlas Pasta Machine, Made in Italy, Stainless Steel, Includes Pasta Cutter, Hand Crank, and Instructions"
    },
    {
        "author": "",
        "binding": "Toy",
        "brand": "Bandai Hobby",
        "department": "",
        "detailPageURL": "https://www.amazon.com/Bandai-Perfect-Grade-Millennium-Falcon/dp/B073ZRGX6T?SubscriptionId=AKIAJCIQK2YC3Q5GXSEA&tag=dlacroix101-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B073ZRGX6T",
        "feature": [
            "The Millennium Falcon, as seen in the celebrated first 1977 film \"Star Wars: A New Hope\" joins the Perfect Grade series, Bandai's flagship line, ultra-detailed plastic model kits",
            "Designed with total accuracy in mind, the kit is based on thorough research of the 1.7M studio model used in the film. It features faithful detail with no compromises",
            "Includes an LED unit to illuminate the engines, landing gear, cockpit and boarding ramp",
            "Includes an LED unit, Photo-Etched parts, water-transfer decals, a custom display base, and instructions. Includes seated figure parts of Han, Luke, Leia, Chewbacca, Obi-Wan, C-3PO",
            "A snap fit kit. No glue required except for Photo-Etched parts"
        ],
        "itemUPC": "",
        "itemID": "B073ZRGX6T",
        "imageLargeURL": "https://images-na.ssl-images-amazon.com/images/I/41iwVs2lpXL.jpg",
        "imageMediumURL": "https://images-na.ssl-images-amazon.com/images/I/41iwVs2lpXL._SL160_.jpg",
        "imageSmallURL": "https://images-na.ssl-images-amazon.com/images/I/41iwVs2lpXL._SL75_.jpg",
        "legalDisclaimer": "",
        "listPrice": "39900",
        "listPriceFormatted": "$399.00",
        "manufacturer": "Bandai - IMPORT FOB Japan",
        "productGroup": "Toy",
        "publicationDate": "",
        "publisher": "Bandai - IMPORT FOB Japan",
        "releaseDate": "2017-10-31",
        "title": "Bandai Star Wars Perfect Grade 1/72 Scale Millennium Falcon"
    },
    {
        "author": "",
        "binding": "Misc.",
        "brand": "JZ Sword",
        "department": "",
        "detailPageURL": "https://www.amazon.com/Sword-Handmade-Japanese-Samurai-Scabbard/dp/B01LYWWAB2?psc=1&SubscriptionId=AKIAJCIQK2YC3Q5GXSEA&tag=dlacroix101-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B01LYWWAB2",
        "feature": [
            "The Katana is 100% Pure Hand-Forged and Hand-Sharpened to Create a Perfect Blade; It is Sharpened, Battle Ready",
            "JZ Sword is a Sword-Craft Shop with More Than 100 Years History; Locates in LongQuan, China Where Specifying Sword Manufaction with 2600-Year History; Completely Handmade Sword with Stunning Workmanship",
            "This Full Tang Samurai Sword Greatly Enhances the Strength of the Sword; The Blade is Made of 1060 Carbon Steel with Perfect Sharpeness",
            "The Tsuba(Guard) is Made of Alloy Metal; High Quality Wooden is Choosen for Saya(Scabbard); The Tsuka(Handle) is Tightly Wrapped Over Imitation Ray Skin and Golden Cotton Cord; This Beautiful Samurai Sword is Also Great for Collection or to Present to Your Friends",
            "Overall Length: 101cm/40in; Blade Length: 72cm/28.35in; Blade Width: 3cm/1.2in; Handle Length: 26cm/10in; Weight: 1.1Kg/2.4Lb"
        ],
        "itemUPC": "792679340661",
        "itemID": "B01LYWWAB2",
        "imageLargeURL": "https://images-na.ssl-images-amazon.com/images/I/51JTlvcImbL.jpg",
        "imageMediumURL": "https://images-na.ssl-images-amazon.com/images/I/51JTlvcImbL._SL160_.jpg",
        "imageSmallURL": "https://images-na.ssl-images-amazon.com/images/I/51JTlvcImbL._SL75_.jpg",
        "legalDisclaimer": "",
        "listPrice": "42800",
        "listPriceFormatted": "$428.00",
        "manufacturer": "JZ Sword",
        "productGroup": "Sports",
        "publicationDate": "",
        "publisher": "JZ Sword",
        "releaseDate": "",
        "title": "Katana Sword, Fully Handmade Real Japanese Sword 1060 High Carbon Steel Samurai Sword with Wooden Scabbard Alloy Guard (Golden)"
    },
]

class Valkyrie extends React.Component{

    constructor(){
        super();

        this.state = {
            cart: [],
            itemList: testProducts,
            moreSearchResultsUrl: "",
            totalResults: 0,
            page: 'shop',
        };

        // bindings
        this.addToCart = this.addToCart.bind(this);
        this.checkout = this.checkout.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.searchAmazon = this.searchAmazon.bind(this);
        this.setPage = this.setPage.bind(this);
        this.updateQty = this.updateQty.bind(this);
    }

    // add new item to shopping cart
    addToCart(itemID){

        // add new item to cart
        let cart = this.state.cart;
        cart.push(this.state.itemList.find(item=>item.itemID === itemID));

        // initialize item quatity
        cart.map(item=>{
            if(item.itemID === itemID){
                item.qty = 1;
            }
            return item;
        });

        // update local memory
        localStorage.valkyrieCart = JSON.stringify(cart);

        // update state
        this.setState({
            cart: cart,
        });
    }

    checkout(){
        // call AWS API to create Amazon cart and complete transaction

        // remove all items from cart in state
        this.setState({
            cart: [],
        });
    }

    componentWillMount(){

        let cart = [];
        if(localStorage.valkyrieCart){
            cart = JSON.parse(localStorage.valkyrieCart);
        }

        this.setState({
            cart: cart,
        });

        // // Make a request for a user with a given ID
        // axios.get(baseURL + "toy")
        
        // .then(response=>{
        //     // console.log(response.data);
        //     this.setState({
        //         cart: cart,
        //         itemList: response.data.itemList,
        //         totalResults: response.data.totalResults,
        //         moreSearchResultsUrl: response.data.moreSearchResults,
        //     });
        // })
        // .catch(error=>{
        //     console.log(error);
        // });
    }

    removeFromCart(itemID){

        // filter all items that do not match provided itemID
        let cart = this.state.cart.filter(item=>item.itemID !== itemID);

        // update local memory
        localStorage.valkyrieCart = JSON.stringify(cart);

        // update state
        this.setState({
            cart: cart,
        });
    }

    searchAmazon(event){

        // prevent page reload
        event.preventDefault();

        let keywords = event.target.keywords.value;
        let searchKeywords = keywords.split(" ").join("+");

        // console.log(baseURL + searchKeywords);

        // Make a request for a user with a given ID
        axios.get(baseURL + searchKeywords)
        
        .then(response=>{
            // console.log(response.data);
            this.setState({
                itemList: response.data.itemList,
                totalResults: response.data.totalResults,
                moreSearchResultsUrl: response.data.moreSearchResults,
            });

            // force page to return to item list
            const location = {
                pathname: '/',
                state: { fromDashboard: true }
            }
            window.location.push(location);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    setPage(currentPage){
        this.setState({
            page: currentPage,
        });
    }

    updateQty(event, itemID){

        // find and update item quatity
        let cart = this.state.cart.map(item => {
            if(item.itemID === itemID){
                item.qty = event.target.value;
            }
            return item;
        });

        // update local storage
        localStorage.valkyrieCart = JSON.stringify(cart);

        // update state
        this.setState({
            cart: cart,
        });
    }

    render(){
        return(
            <div>
                <NavBar inCart={ this.state.cart.length } searchAmazon={ this.searchAmazon } />
                <div className="jumbotron">
                    <img src={ "valkyrie.png" } alt="Valkyrie Logo" />
                    <h1 className="display-1"> Valkyrie Online Store </h1>
                    <p className="lead"> Finding the things you want at heroic prices you'll die for </p>
                </div>
                <div className="container-fluid">
                    <Switch>
                        <Route exact path={"/"} render={ (props)=><ItemList match={ props.match } items={ this.state.itemList } addToCart={ this.addToCart } /> } />
                        <Route path={"/item-details/:itemId"} render={ (props)=><ItemDetails match={ props.match } item={ this.state.itemList.concat(this.state.cart).find(item=>props.match.params.itemId === item.itemID) } addToCart={ this.addToCart } removeFromCart={ this.removeFromCart } /> } />
                        <Route path={"/cart"} render={ (props)=><ShoppingCart match={ props.match } items={ this.state.cart } removeFromCart={ this.removeFromCart } updateQty={ this.updateQty } checkout={ this.checkout } /> } />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Valkyrie;