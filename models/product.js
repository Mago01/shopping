var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	imageThumb: {type: String, require: true},
	imageOnePath: {type: String, require: false},
	imageTwoPath: {type: String, require: false},
	title: {type: String, require: true},
	description: {type: String, require: true},
	descriptionExtend: {type: String, require: false},
	price: {type: Number, require: true},
	avel: {type: Number, require: true}
});

module.exports = mongoose.model('Product', schema);
