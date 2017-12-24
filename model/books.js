var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
if (mongoose.connection.readyState == 0) {

	mongoose.connect('mongodb://localhost:27017/library');
}

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

var bookSchema = new mongoose.Schema({
	ISBN: {
		type: String,
		unique: true,
		required: true
	},
	title: String,
	author: [String],
	genre: [String],
	price: Number,
	copies: [{
		status: {
			type: String,
			// [{

			//	enum: ['available', 'borrowed', 'late', 'maintenance', 'lost']
			// 
			
			default: 'available'
		},
		lastBorrower: {
			type: String,
			default: ' - '
		},
		borroweredDate: {
			type: Date,
			default: Date.now
		}

	}]


}, {
		versionKey: false
	});



var books = mongoose.model('books', bookSchema);


function getAllBooks(cb) {
	books.find({}, cb);
}

function getBookbyStatus(data, cb) {
	books.aggregate([
		{
			$match: {'copies.status':data}
		},
		{
			$unwind: '$copies'
		},
		{
			$match: {'copies.status':data}
		}
	], cb);
}

function searchBook(data, cb) {

	books.find({
		$or: [
			{ 'ISBN': { "$regex": data, "$options": "i" } },
			{ 'title': { "$regex": data, "$options": "i" } },
			{ 'author': { "$regex": data, "$options": "i" } },
			{ 'email': { "$regex": data, "$options": "i" } }
		]
	}, cb);
}

function getBookByISBN(ISBN, cb) {
	books.findOne({ ISBN: ISBN }, cb);
}

function pushNewCopies(ISBN, cb) {
	books.update({ ISBN: ISBN }, {
		$push: { copies: {} }
	}, { 'new': true }, cb);
}

function getCopiesData(id, cb) {
	books.findOne({ 'copies._id': id }, cb);
}

function changeBookStatus(data, cb) {
	books.findOneAndUpdate({ 'copies._id': data.id },
	{ $set: { 'copies.$.status': data.status, 'copies.$.lastBorrower': data.lastBorrower } 
	}, cb);
}

function addNewBook(newBook, cb) {
	books(newBook).save(cb);
}


function deleteBookByISBN(bookISBN, cb) {
	books.deleteOne({ ISBN: bookISBN }, cb);
}


function updateBookById(bookISBN, bookData, cb) {
	books.updateOne({ ISBN: bookISBN }, { $set: bookData }, cb);
}

module.exports = {
	getAllBooks: getAllBooks,
	getBookByISBN: getBookByISBN,
	getBookbyStatus: getBookbyStatus,
	addNewBook: addNewBook,
	searchBook: searchBook,
	getCopiesData: getCopiesData,
	pushNewCopies: pushNewCopies,
	deleteBookByISBN: deleteBookByISBN,
	changeBookStatus: changeBookStatus,
	updateBookById: updateBookById
}
