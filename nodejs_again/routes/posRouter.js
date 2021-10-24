const express = require('express')
const router = express.Router();

router.get('/order/:table_id', (req, res)=>{
	const table_id = req.params.table_id;
	console.log("몇번?:", table_id)
	res.render('order_view', {table_id})
})
module.exports = router;