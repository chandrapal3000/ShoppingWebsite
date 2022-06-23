var Product = require("../models/product");

var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://chandrapal3000:Chandra123@cluster0.i8kkx.mongodb.net/shopping_database?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connection successful");
}).catch((error)=>console.log("No connection"));

var products = [
    new Product({
        id : 1,
    title : "Hey this is title",
    description : "Hey this is description",
    catagory : "Mens wear",
    imageUrl : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating : "{rate : 4.3,count:399}",
    }),
    new Product({
        id : 3,
    title : "Hey this is title",
    description : "Hey this is description",
    catagory : "Mens wear",
    imageUrl : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating : "{rate : 4.3,count:399}",
    }),
    new Product({
        id : 4,
    title : "Hey this is title",
    description : "Hey this is description",
    catagory : "Mens wear",
    imageUrl : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating : "{rate : 4.3,count:399}",
    }),
]
var done = 0;
for (var i=0;i<products.length;i++){
    products[i].save((error,result)=>{
        done++;
        if (done==products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}