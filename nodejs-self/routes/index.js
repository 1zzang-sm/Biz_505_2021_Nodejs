var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	console.log(req.body)
	res.json({
		userid: req.user.userid,
		password: req.user.password
	})
})

module.exports = router;
