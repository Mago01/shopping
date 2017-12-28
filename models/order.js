var mongoose = require('mongoose');
var orderSchema = mongoose.Schema;

var schema = new orderSchema({
	user: {type:schema.Types.ObjectId, ref: 'User'},
	cart: {type: Object, required: true},
	address: {type:String, required:true},
	city: {type:String, required:true},
	state: {type:String, required:true},
	zipcode: {type:String, required:true},
	name: {type:String, required:true},
	paymentId: {type:String, required:true}
});

module.exports = mongoose.model('Product', schema);
