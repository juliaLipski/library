var express = require('express');
var router = express.Router();
var mdb = require('../model/librarians.js');

router.get("/", (req, res) => {

  mdb.getAlllibrarian(function (err, data) {
    res.json(data)
  });
});


module.exports = router;