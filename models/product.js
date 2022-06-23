var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    id : {type : Number, required : true},
    title : {type : String, required : true },
    description : {type : String, required : false },
    catagory : {type : String, required : false },
    imageUrl : {type : String, required : true },
    rating : {type : String,required : false},
})

// schema.set('collection', 'products');

// var collectionName = 'product'
// var M = mongoose.model('Product',schema,'product');

module.exports = mongoose.model("Product",schema,"products");