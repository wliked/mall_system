/**
 * Created by drjr on 17-11-30.
 */
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
    console.log("mongodb connect successfully!");
});

mongoose.connection.on("disconnected", function () {
    console.log("mongodb disconnected!");
});

router.get("/", function (req, res, next) {
    Goods.find({}, function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        }else{
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    })
});

module.exports = router;