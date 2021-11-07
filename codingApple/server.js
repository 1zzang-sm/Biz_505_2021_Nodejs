const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

var db;

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb+srv://1zzang:biz123123@mymongodb.ospra.mongodb.net/myFirstDB?retryWrites=true&w=majority', (err, client) => {
	if (err) { return console.log(err) }
	
	db = client.db('myFirstDB');
	// db.collection('todo').insertOne({ name: 'John', age : 26 }, (error, result) => {
	// 	console.log('save ok!')
	// });

	app.listen(8080, () => {
	console.log('listening on 8080')
	})
})

app.get('/', (req, res) => {
	res.render('index.ejs');
});
app.get('/write', (req, res) => {
  res.render('write.ejs');
});
app.post('/add', (req, res) => {
	res.send('posting ok!!');
		db.collection('counter').findOne({ name: 'postCount' }, (error, result) => {
			console.log('result : ', result.totalPost)
			let postCount = result.totalPost

			db.collection('todo').insertOne({ _id: postCount + 1, name: req.body.title, age: req.body.date }, (error, result) => {
				console.log("success save!")
				db.collection('counter').updateOne({ name: 'postCount' }, { $inc : { totalPost: 1 } }, (err, result) => {
					if (err) { return console.log(err) }
			})
		})
		
	})
});

app.delete('/delete', (req, res) => {
	console.log(req.body)
	req.body._id = parseInt(req.body._id)
	db.collection('todo').deleteOne( req.body , (err, result) => {
		console.log('success delete!')
		res.status(200).send({ message : '성공했습니다.' });
	})
})


app.get('/list', (req, res) => {
	// 디비에 저장된 todo collection의 모든 데이터를 꺼내주세요.
	db.collection('todo').find().toArray((error, result) => {
		console.log(result);
		res.render('list.ejs', { todos : result })
	})
})

app.get('/detail/:id', (req, res) => {
	db.collection('todo').findOne({_id : parseInt(req.params.id)}, (err, result) => {
		console.log('detail:',result)
		res.render('detail.ejs', { data : result });
	})
})

app.get('/edit/:id', (req, res) => {
	db.collection('todo').findOne({ _id: parseInt(req.params.id) }, (err, result) => {
		console.log('edit:', result);
		res.render('edit.ejs', { Edata : result})	
	})
})
app.put('/edit', (req, res) => {
	db.collection('todo').updateOne({ _id: parseInt(req.body.id) }, { $set: { name: req.body.title, age: req.body.date } }, (err, result) => {
			console.log('update success')
			res.redirect('/list')
	})
})

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')

app.use(session({ secret: 'king', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res) => {
	res.render('login.ejs')
})
app.post('/login', passport.authenticate('local', { failureRedirect : '/fail'}), (req, res) => {
	res.redirect('/')
})

// create middle ware 


// id, pw 맞는지 검사하는 절차
passport.use(new LocalStrategy({
	usernameField: 'id',
	passwordField: 'pw',
	session: true,
	passReqToCallback: false,
}, (id, pw, done) => {
	console.log('id: ', id, 'pw: ', pw);
	db.collection('login').findOne({ id: id }, (err, result) => {
		if (err) return done(err);
		if (!result) return done(null, false, { message: 'not have id ' });
		if (pw == result.pw) {
			return done(null, result)
		} else {
			return done(null, false, { message: 'wrong your password' });
		}
	})
}));

// create session
// 세션을 저장시키는 코드(로그인 성공시 발동)
// 위 결과가 id/pw 검증 성공시 user 파라미터에 담음
passport.serializeUser((user, done) => {
	done(null, user.id) // id를 이용해서 세션을 저장시키는 코드
});

// 이 세션 데이터를 가진 사람을 DB에서 찾아주세요 (마이페이지 등 접속시 발동)
// 이사람이 세션이 있나 없나 찾을때 실행하는 함수
passport.deserializeUser((id, done) => {
	db.collection('login').findOne({ id: id }, (err, result) => {
		done(null, result)	
	})
});
function loginOk(req, res, next){
	if (req.user) {
		next();
	} else {
		res.send('로그인을 해주세요.');
	}
}
app.get('/mypage', loginOk, (req, res) => {
	console.log('사용자정보:',req.user)
	res.render('mypage.ejs', {us : req.user});
});