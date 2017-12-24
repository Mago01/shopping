var express = require('express');
var router = express.Router();
var Product = require('../models/product');

// var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function (err, docs) {
	 res.render('shop/index', { title: 'Shopping Cart', products: docs });	
	});
 
});

module.exports = router;
