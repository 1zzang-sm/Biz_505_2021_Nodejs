import passport from 'passport'
import passportLocal from 'passport-local'
import User from '../models/User.js'

const LocalStratege = passportLocal.Strategy;

const exportPassport = () => {
	passport.serializeUser((user, done) => {
		console.log("로그인 성공")
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		console.log("DESC", user);
		done(null, user)
	});

	passport.use(
		new LocalStratege(
			{
			usernameField: "userid",
			passwordField: "password",
			session: true,
			},
			(userid, password, done) => {
				User.findOne({ userid, password }, (err, data) => {
					if (err) {
						return done(err);
					}
					if (!data) {
						return done(null, false, { message: "존재하지 않는 아이디 입니다."})
					}

					if (data.password != password) {
						return done(null, false, { message : "비밀번호 오류"})
					}
					return done(null, data)
				})
			}
		)
	)
}

export default exportPassport;