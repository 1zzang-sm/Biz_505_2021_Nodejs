var express = require('express');
var router = express.Router();

const { tbl_product } = require("../models/index");

/* GET home page. */
router.get('/', function(req, res, next) {
	tbl_product.findAndCountAll()
	.then((result) => {
		console.log(result)
		res.render('index', { PDT : result.rows });
	})
});

module.exports = router;
