var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Order = require('../models/order');
var Address = require('../models/address');
var Cart = require('../models/cart');

router.get('/orders/open', function(req, res, next){
	Order.find({status: 'open'}, function( err, orders){
		var cart;
		var open = 1;
		orders.forEach(function(order){
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('admin/orders', {orders: orders, status: open});
	});
});
router.get('/orders/closed', function(req, res, next){
	var open;
	Order.find({status: 'closed'}, function( err, orders){
		var cart;
		orders.forEach(function(order){
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('admin/orders', {orders: orders});
	});
});

module.exports = router;