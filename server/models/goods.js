/**
 * Created by drjr on 17-11-30.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "productImage": String,

});

module.exports = mongoose.model('Good', productSchema);