const express = require("express")
const router = express.Router()

const { tbl_product, tbl_orders } = require("../models/index")

router.get("/", (req, res) =>{
	const { data }  = req.query

	tbl_product.findAndCountAll()
	.then( (result) => {
		res.render("list", { PDT : result.rows, data : data})
	})
})
router.post("/", (req, res) =>{
	const { data } = req.query

	tbl_product.findAndCountAll()
	.then( (result) => {
		res.render("list", { PDT : result.rows, data: data})
	})
})
module.exports = router;
