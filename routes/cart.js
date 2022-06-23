var express = require('express');
const cart = require('../models/cart');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var procucts = req.session.products;
  var cart = req.session.cart;
  var cartEmpty = false;
  var cartHasItems = true;
  var cartTotalItems = 0;
  if(cart==undefined || cart.length<=0 ){
    cartEmpty = true
    cartHasItems = false
  } else{
    cartTotalItems = cart.totalQty;
  }
  var secret = req.session.secret;
  console.log("cart : ",cart);
  console.log("secret : ",secret);

  res.render('shop/cart', { title: 'Express',cartItems:cart,cartEmpty:cartEmpty,cartHasItems:cartHasItems,cartTotalItems:cartTotalItems});

});

router.get('/add/:id', function(req, res, next) {
  var productId = req.params.id;
  var procucts = req.session.products;

  console.log("products : ",procucts);
  var cartProduct = filterById(procucts,productId);
  console.log("product : ",cartProduct);

  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.add(cartProduct,cartProduct.id);
  req.session.cart = cart; 
  console.log("cart : ",req.session.cart);
  res.redirect('/cart')
});

router.get('/remove/:empty_cart', function(req, res, next) {
  if(req.params.empty_cart=="yes"){
  req.session.cart = null; 

  }
  console.log("cart : ",req.session.cart);
  res.redirect('/cart')
});

function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}

module.exports = router;
