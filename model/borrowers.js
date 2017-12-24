var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
if (mongoose.connection.readyState == 0) {
	mongoose.connect('mongodb://localhost:27017/library');
}

var borrowersSchema = new mongoose.Schema({
	name: {
		firstname: {
			type: String
		},
		lastname: {
			type: String
		}
	},
	email: String,
	phone: String,
	address: String,
	brBooks: [String]

},{
	versionKey: false
});

var borrowers = mongoose.model('borrowers', borrowersSchema);

function getActiveBorrovers (cb){
borrowers.find({ brBooks: { $gt: [] } },cb);

}

function getAllborrowers(cb) {
	borrowers.find({}, cb);
}


function searchBorrower(data, cb) {
	
	borrowers.find({
		$or: [
			{ 'id': { "$regex": data, "$options": "i" }},
			{ 'name.firstname': { "$regex": data, "$options": "i" }},
			{ 'name.lastname': { "$regex": data, "$options": "i" } },
			{ 'email': { "$regex": data, "$options": "i" } },
		]
	}, cb);
}

function pushNewBook(idBr, bookId, cb) {
	borrowers.update({_id: idBr},{
  	$push: {brBooks: bookId}
	},{ 'new': true}, cb);	
}

function addNewborrower(newborrower, cb) {
	 borrowers(newborrower).save(cb);
}

function deleteborrowersById(id, cb) {
	borrowers.deleteOne({ _id: id }, cb);
}

function updateBorrowerById(brId, borrowerData, cb) {
	borrowers.updateOne({ _id: brId}, { $set: borrowerData }, cb);
}

module.exports = {
	getAllborrowers: getAllborrowers,
	addNewborrower: addNewborrower,
	deleteborrowersById: deleteborrowersById,
	searchBorrower: searchBorrower,
	pushNewBook: pushNewBook,
	getActiveBorrovers: getActiveBorrovers,
	updateBorrowerById: updateBorrowerById
}
