var express = require('express');
var router = express.Router();
var mdb = require('../model/books.js');
var mdbR = require('../model/borrowers.js');

router.get('/', (req, res) =>{ 
  res.render('index');
});

module.exports = router;
