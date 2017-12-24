var express = require('express');
var router = express.Router();
var mdb = require('../model/borrowers.js');


router.get("/", (req, res) => {
  mdb.getAllborrowers(function (err, data) {
    res.json(data)
  });
});

router.get('/getActive/', (req, res) => {
  
  mdb.getActiveBorrovers( (err, param) => {
    console.log(param)
    res.json(param)
  });
});

router.get('/search/:param', (req, res) => {
  var dataSearch = req.params.param;
 
  mdb.searchBorrower(dataSearch, (err, param) => {
    res.json(param)
  });
});

router.post('/', (req, res) => {
  var newborrower = {
    name:{firstname: req.body.name.firstname, lastname:req.body.name.lastname},
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    brBooks: req.body.brBooks
  };

  mdb.addNewborrower(newborrower, (err, data) => {
   console.log(data);
     res.json(data);
  });
});

router.delete('/:id', function (req, res) {
  
  var idBr= req.params.id;
  mdb.deleteborrowersById(idBr ,(error, data)  => {
    res.json(data);
  });
});

router.put('/addBook/:id', (req, res) => {
  var idBr = req.params.id;
 var bookId = req.body.idBr;
  mdb.pushNewBook(idBr, bookId, (err, data) => {
    res.json(data);
  });
});

router.put('/:id', (req, res) => {
  var idBr = req.params.id;
  var borrowerData = {};
  for (var key in req.body) {
    if (key !== undefined) {
      borrowerData[key] = req.body[key];
    }
  }
  mdb.updateBorrowerById(idBr, borrowerData, (err, data) => {
    console.log(data)
    res.json(data);
  });
});


module.exports = router;