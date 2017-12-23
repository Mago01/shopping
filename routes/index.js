var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var passport = require('passport');
// var user = require('../models/user');

var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function (err, docs) {
	 res.render('shop/index', { title: 'Shopping Cart', products: docs });	
	});
 
});
router.get('/users/signup', function(req, res, next){
	var messages = req.flash('error');
	res.render('users/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
router.post('/users/signup',passport.authenticate('local.signup', {
	successRedirect:'/users/profile',
	failureRedirect: '/users/signup',
	failureFlash:true
}));

router.get('/users/profile', function(req, res, next) {
	res.render('users/profile');
});

module.exports = router;
