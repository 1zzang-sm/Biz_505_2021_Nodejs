const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const User = require('../models/User.js')

passport.use(new LocalStrategy({
	usernameField: 'userid',
	passwordField: 'password',
	session: true,
	passReqToCallback: false,
}), (userid, password, done)=>{
	console.log(userid, password)
	User.findOne({ userid: userid, password: password }, (err, data) => {
		if (err) return done(err)
		if (!data) return done(null, false, { message: '존재하지 않는 아이디입니다.' });
		if (password == data.pw) {
			return done(null, data);
		} else {
			return done(null, false, { message: '비번이 틀렸어요' });
		}
	})
})
passport.serializeUser((user, done) => {
	done(null, user.id)
})
passport.deserializeUser((userid, done) => {
	done(null, {})
})