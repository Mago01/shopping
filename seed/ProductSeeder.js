var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('localhost:27017/shopping');

var products = [
	new Product ({
	imageThumb: 'https://i.ytimg.com/vi/8NiCRYZVscc/maxresdefault.jpg',
	title: 'Master Sowrd',
	description: 'best wepon',
	descriptionExtend: 'its the best',
	price: 222,
	avel: 1
	}),
	new Product ({
	imageThumb: 'https://i.ytimg.com/vi/8NiCRYZVscc/maxresdefault.jpg',
	title: 'Master Sowrd',
	description: 'yay',
	descriptionExtend: 'its the best',
	price: 5565,
	avel: 1
	}),
	new Product ({
	imageThumb: 'https://i.ytimg.com/vi/8NiCRYZVscc/maxresdefault.jpg',
	title: 'Master Sowrd',
	description: 'best wepon',
	descriptionExtend: 'its the best',
	price: 43243,
	avel: 2
	}),
];

var done =0;
for (var i = 0; i < products.length; i++){
	products[i].save(function(err, result){
		done++;
		if (done===products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
};

