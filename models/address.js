var mongoose = require('mongoose');
var addressSchema = mongoose.Schema;

var schema = new addressSchema({
	user: {type:addressSchema.Types.ObjectId, ref: 'User'},
	street: {type:String, required:true},
	city: {type:String, required:true},
	state: {type:String, required:true},
	zipcode: {type:String, required:true},
	name: {type:String, required:true},
});

module.exports = mongoose.model('Address', schema);
