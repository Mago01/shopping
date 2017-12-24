var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('localhost:27017/shopping');

var products = [
	new Product ({
	imageThumb: 'https://i.ytimg.com/vi/8NiCRYZVscc/maxresdefault.jpg',
	title: 'New sword',
	description: 'best wepon',
	descriptionExtend: 'its the best',
	price: 80,
	avel: 1
	}),
	new Product ({
	imageThumb: 'https://i.ytimg.com/vi/8NiCRYZVscc/maxresdefault.jpg',
	title: 'old Sowrd',
	description: 'yay',
	descriptionExtend: 'its the best',
	price: 24,
	avel: 1
	}),
	new Product ({
	imageThumb: 'https://i.ytimg.com/vi/8NiCRYZVscc/maxresdefault.jpg',
	title: 'Master Sowrd',
	description: 'best wepon',
	descriptionExtend: 'its the best',
	price: 200,
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

