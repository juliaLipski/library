var express = require('express');
var router = express.Router();
var mdb = require('../model/books.js');


router.get("/", (req, res) => {
  mdb.getAllBooks(function (err, data) {
    res.json(data)
  });
});

router.get('/getBooksByStatus/:status', (req, res) => {
  var dataSearch = req.params.status;
 console.log(req.params.status)
  mdb.getBookbyStatus(dataSearch, (err, param) => {
     console.log(param)
    res.json(param)
  });

});

router.get('/getCopy/:id', (req, res) => {
  var idB = req.params.id;
 console.log(idB)
  mdb.getCopiesData(idB, (err, data) => {
    console.log(data.copies)
    res.json(data.copies)
  });

});
router.get('/search/:param', (req, res) => {
  var dataSearch = req.params.param;
 
  mdb.searchBook(dataSearch, (err, param) => {
    res.json(param)
  });

});
 

router.get('/:ISBN', (req, res) => {
  var bookId = req.params.ISBN;
console.log("hii")
  mdb.getBookByISBN(bookId, (err, data) => {
    res.json(data);
  });
});

router.delete('/deleteAll/:ISBN', (req, res) => {
  console.log(req.params.ISBN)
  var booksISBN = req.params.ISBN;
  mdb.deleteBookByISBN(booksISBN, (err, data) => {
    res.json(data);
  });
});

router.put('/addCopy/:ISBN', (req, res) => {
  var booksISBN = req.params.ISBN;
  mdb.pushNewCopies(booksISBN, (err, data) => {
    console.log(data)
    res.json(data)
  })
 
});

router.put('/changeStatus/:id', (req, res) => {
  mdb.changeBookStatus(req.body,(err, data) => {
    console.log(data);
    res.json(data);
  })
 
});



router.put('/:ISBN', (req, res) => {
  var booksISBN = req.params.ISBN;
  var bookData = {};
  for(var key in req.body){
    if(req.body[key]){
      bookData[key] = req.body[key];
    }
  }
  console.log(bookData)
  mdb.pushNewCopies(booksISBN, bookData, (err, data) => {
    console.log(data)
    res.json(data)
  })
 
});

router.post('/', (req, res) => {
  var newBook = {
    ISBN: req.body.ISBN,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    copies:[{copyId:req.body.copyId,status:req.body.status,lastBorrower:req.body.lastBorrower,borroweredDate:req.body.borroweredDate}]
  };
console.log(newBook)
  mdb.addNewBook(newBook, (err, data) => {
    console.log(data)
    res.json(data)
  })
});

// router.get('/:ISBN', (req, res) => {
//   var bookId = req.params.ISBN;

//   mdb.getBookByISBN(bookId, (err, data) => {
//     res.json(data);
//   });

// });
// router.post('/search', (req, res) => {
//   var book = {
//     ISBN: req.body.ISBN,
//   };
//  mdb.getBookByISBN(book, (err, data) => {
//     res.json(data);
//   });

// });
module.exports = router;