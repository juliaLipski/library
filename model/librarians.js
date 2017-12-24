var mongoose = require('mongoose');
var crypto = require('crypto')
if(mongoose.connection.readyState == 0){
mongoose.connect('mongodb://localhost:27017/library');
}

var librarianSchema = new mongoose.Schema({
	name: {firstname:String, lastname:String},
	emal: String,
    phone:Number,
	// hasedpassword:{
	// 	type:String,
	// 	required: true
	// },
	// salt:{
	// 	type:String,
	// 	required: true
	// },
	// created: {
	// 	created: Data,
	// 	default: Data.now
	// }
	 password: String

},{
	versionKey: false
});
var librarian = mongoose.model('librarians',librarianSchema);

function getAlllibrarian(cb) {
	librarian.find({},"-_id",cb);
}

function getlibrarianByName(firstname,lastname,password, cb) {
	librarian.findOne({"firstname": firstname,"lastname":lastname,"password":password},"-_id",cb);
}

function addNewlibrarian(newlibrarian, cb) {
	new librarian(newlibrarian).save(cb);
}


module.exports = {
	getAlllibrarian: getAlllibrarian,
	getlibrarianByName: getlibrarianByName,
	addNewlibrarian: addNewlibrarian
}
