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
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let priceLevel = req.param("priceLevel");
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let priceGt = '', priceLt = '';

    let params = {};

    if (priceLevel!='all') {
        switch (priceLevel) {
            case '0': priceGt = 0; priceLt = 100; break;
            case '1': priceGt = 100; priceLt = 500; break;
            case '2': priceGt = 500; priceLt = 1000; break;
            case '3': priceGt = 1000; priceLt = 5000; break;
        }
        params= {
            salePrice: {
                $gt:priceGt,
                $lt:priceLt
            }
        }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({"salePrice": sort});

    goodsModel.exec(function (err, doc) {
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

//加入到购物车
router.post("/addCart", function (req, res, next) {
    let userId = "100000077", productId = req.body.productId;
    let User = require("../models/user");
    User.findOne({userId:userId}, function (err, userDoc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        }else {
            console.log("userDoc:" + userDoc);
            if(userDoc) {
                let goodsItem = '';
                userDoc.cartList.forEach(function (item) {
                    if(item.productId == productId) {
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                if (goodsItem) {
                    userDoc.save(function (err2, doc2) {
                        if (err2) {
                            res.json({
                                status: '1',
                                msg: err2.message
                            })
                        }else{
                            res.json({
                                status: '0',
                                msg: 'suc',
                                result: 'suc'
                            })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId}, function (err1, doc1) {
                       if (err1) {
                           res.json({
                               status: '1',
                               msg: err1.message
                           })
                       }else{
                           if (doc1) {
                               doc1.productNum = 1;
                               doc1.checked = 1;

                               userDoc.cartList.push(doc1);
                               userDoc.save(function (err2, doc2) {
                                   if (err2) {
                                        res.json({
                                            status: '1',
                                            msg: err2.message
                                        })
                                   }else{
                                        res.json({
                                            status: '0',
                                            msg: 'suc',
                                            result: 'suc'
                                        })
                                   }
                               })
                           }
                       }
                    })
                }
            }
        }
    })

})


module.exports = router;