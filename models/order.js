var mongoose = require('mongoose');
var orderSchema = mongoose.Schema;

var schema = new orderSchema({
	user: {type: orderSchema.Types.ObjectId, ref: 'User'},
	cart: {type: Object, required: true},
	city: {type:String, required:true},
	street:{type:String, required:true},
	state: {type:String, required:true},
	zipcode: {type:String, required:true},
	name: {type:String, required:true},
	paymentId: {type:String, required:true},
	date: {type:Date, default: Date.now},
	status: {type:String, required:true}
});

module.exports = mongoose.model('Order', schema);
