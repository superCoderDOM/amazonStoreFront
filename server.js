const aws       = require("aws-lib");
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const express   = require('express'),
      app       = express(),
      PORT      = 8080;
const env       = require('./.env');

const dataBase  = [];

// location.href="http://www.somedomain.com";
// location.pathname="/item-details";

// Authorization middleware
function logger(req, res, next){
    // VERIFY json web token
    let tokenToValidate = req.headers['authorization'];
    jwt.verify(tokenToValidate, env.valkyrieSeretKey, (err, decodedPayload)=>{
        if(err){
            return res.status(403);
        }
        next();
    });
}

// Middleware registration
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// SIGNUP Endpoint
app.post('/signup', (req, res)=>{

    if(req.body.username && req.body.password){

        for(let i = 0; i < dataBase.length; i++){

            if(dataBase[i].username === req.body.username){
                return res.status(406).json({msg: 'This username already exists, please choose something else'});
            }
        }

        bcrypt.genSalt(12, (err, salt)=>{
            if(err){
                return res.status(500).json(err);
            }

            bcrypt.hash(req.body.password, salt, (err, hashedPassword)=>{

                if(err){
                    return res.status(500).json(err);
                }
        
                dataBase.push({
                    username: req.body.username,
                    password: hashedPassword,
                });

                return res.status(200).json({msg: 'Thanks for registering with us!'});
            });
        });

    }else{

        return res.status(406).json({msg: 'Please enter a username and password'});
    }
});

// LOGIN Endpoint
app.post('/login', (req, res)=>{

    if(req.body.username && req.body.password){

        let userAccount = dataBase.find((account)=>account.username === req.body.username);
        let password = userAccount.password;
    
        bcrypt.compare(req.body.password, password, (err, match)=>{

            if(err){
                return res.status(500).json(err);
            }
            if(match){
                let payload = {
                    iss: 'livinglavidalacroix.com',
                    sub: req.body.username,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                };
                
                let token = jwt.sign(payload, env.valkyrieSeretKey);
                
                return res.status(200).json({token: token});

            }else{
                return res.status(401).json({msg: 'Dang! The username and password you provided do not match, please try again!'});
            }
        });

    }else{

        return res.status(406).json({msg: 'Please provide a username and password'});
    }
});

app.get('/private', logger, (req, res)=>{
    res.status(200).json({msg: 'Welcome to your private treasure trove!'});
});

// SEARCH Amazon product database
app.get('/search', (req, res)=>{
    
    const prodAdv = aws.createProdAdvClient(env.awsAccessKeyId, env.awsSecretKey, env.awsAssociateTag);
    
    const options = {SearchIndex: "All", Keywords: req.query.keywords.split(" ").join("+"), Availability: "Available", ResponseGroup: "Images,ItemAttributes" }
    
    prodAdv.call("ItemSearch", options, (err, result)=>{
        if(err){
            return res.status(500).json(err);
        }
        let itemList = result.Items.Item.map(item=>{
            return {
                author: item.ItemAttributes.Author? item.ItemAttributes.Author:"",
                binding: item.ItemAttributes.Binding? item.ItemAttributes.Binding:"",
                brand: item.ItemAttributes.Brand? item.ItemAttributes.Brand:"",
                department: item.ItemAttributes.Department? item.ItemAttributes.Department:"",
                detailPageURL: item.DetailPageURL? item.DetailPageURL:"",
                feature: item.ItemAttributes.Feature? item.ItemAttributes.Feature:"",
                itemUPC: item.ItemAttributes.UPC? item.ItemAttributes.UPC:"",
                itemID: item.ASIN? item.ASIN:"",
                imageLargeURL: item.LargeImage? item.LargeImage.URL:"",
                imageMediumURL: item.MediumImage? item.MediumImage.URL:"",
                imageSmallURL: item.SmallImage? item.SmallImage.URL:"",
                legalDisclaimer: item.ItemAttributes.LegalDisclaimer? item.ItemAttributes.LegalDisclaimer:"",
                listPrice: item.ItemAttributes.ListPrice? item.ItemAttributes.ListPrice.Amount:"",
                listPriceFormatted: item.ItemAttributes.ListPrice? item.ItemAttributes.ListPrice.FormattedPrice:"",
                manufacturer: item.ItemAttributes.Manufacturer? item.ItemAttributes.Manufacturer:"",
                productGroup: item.ItemAttributes.ProductGroup? item.ItemAttributes.ProductGroup:"",
                publicationDate: item.ItemAttributes.PublicationDate? item.ItemAttributes.PublicationDate:"",
                publisher: item.ItemAttributes.Publisher? item.ItemAttributes.Publisher:"",
                releaseDate: item.ItemAttributes.ReleaseDate? item.ItemAttributes.ReleaseDate:"",
                title: item.ItemAttributes.Title? item.ItemAttributes.Title:"",
            };
        });

        let searchResults = {
            totalResults: result.Items.TotalResults,
            moreSearchResultsUrl: result.Items.MoreSearchResultsUrl,
            itemList: itemList,            
            // itemList: result.Items.Item,
        }
        return res.status(200).json(searchResults);
    });
});

// PORT Registration
app.listen(PORT, ()=>{
    console.log('Server listening on Port:', PORT, '\nUse CRTL-C to exit'); 
});