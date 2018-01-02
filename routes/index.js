var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Address = require('../models/address');

// var user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	var successMsg = req.flash("success")[0];
	Product.find(function (err, docs) {
	 res.render('shop/index', { title: 'Shopping Cart', products: docs, successMsg: successMsg, noMessages:!successMsg });	
	});
 
});

router.get('/add-to-cart/:id', function(req,res){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart: {});

	Product.findById(productId, function(err, product){
		if (err){
			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/');
	});
});

router.get('/shopping-cart', function(req, res, next){
	if(!req.session.cart){
		return res.render('shop/shopping-cart', {products:null});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
	var m = cart.generateArray();
	console.log(m.length);
});

router.get('/shipping-address', function(req, res, next){
	if(!req.session.cart){
		res.redirect('/');
	}
		return res.render('shop/shipping-address');
});
router.post('/shipping-address', function(req, res, next){
	var address = new Address ({
	user: req.user,
	street: req.body.street,
	city: req.body.city,
	state: req.body.state,
	zipcode: req.body.zipcode,
	name: req.body.name
	});
	console.log(address);
	req.session.address = address;
	address.save(function(err, result){
  		if (err){
  		
  		}
  		return res.redirect('/checkout');
  	});
	
});
router.get('/checkout', function(req, res, next){
	if(!req.session.cart){
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/checkout', {total: cart.totalPrice, totalD: 100*cart.totalPrice});
})

router.post('/checkout', function(req, res, next){
	if(!req.session.cart){
		return res.redirect('/shopping-cart');
	}
	// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_p3cwSmsgUX9JCdq5hJpUWFj9");

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
var token = req.body.stripeToken; // Using Express
var cart = new Cart(req.session.cart);
// Charge the user's card:
stripe.charges.create({
  amount: cart.totalPrice*100,
  currency: "usd",
  description: "Test Charge",
  source: token,
}, function(err, charge) {
  if (err){
  	req.flash('error', error.message);
  }
  var order = new Order ({
  	user: req.user,
  	cart: cart,
  	street: req.session.address.street,
  	city: req.session.address.city,
  	state:req.session.address.state,
  	zipcode:req.session.address.zipcode,
  	name:req.session.address.name,
  	paymentId: charge.id
  });
  console.log(order);
  console.log(order.address);
  order.save(function(err, result){
  	if (err){
  		
  	}
  });
  req.flash('success', 'Successfully bought products!');
  req.session.cart = null;
  req.session.address = null;
  res.redirect('/');
});
})

module.exports = router;