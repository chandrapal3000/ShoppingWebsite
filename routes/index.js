var express = require("express");
var router = express.Router();
var Product = require("../models/product");
const https = require("https");
// var fetch = require("node-fetch");

/* GET home page. */
router.get("/", function (req, resHigh, next) {
  // Product.find({}).then((products)=>{
  //   console.log("elements : ",products);

  //   res.render('shop/index', { title: 'Express',products:products });
  // }).catch((error)=>console.log("Some error",error));

  let url = "https://fakestoreapi.com/products";
  let header = { method: "Get" };
  var productData = [];

  // https method

  https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          let json = JSON.parse(body);

          // do something with JSON
          console.log("Json : ", json);
          // productData.push(...json);
          req.session.products = json;

          var cart = req.session.cart;
          var cartEmpty = false;
          var cartHasItems = true;
          var cartTotalItems = 0;
          if (cart == undefined || cart.length <= 0) {
            cartEmpty = true;
            cartHasItems = false;
          }else{
            cartTotalItems = cart.totalQty;
          }

          resHigh.render("shop/index", { title: "Express", products: json,cartHasItems:cartHasItems,cartTotalItems :cartTotalItems});
        } catch (error) {
          console.error(error.message);
        }
      });
    })
    .on("error", (error) => {
      console.error(error.message);
    });

  // https method
  console.log("productData : ", productData);
});

module.exports = router;
