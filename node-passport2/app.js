/**
* express generator ES6+ template
* @edit : callor@callor.com
* @since : 2020-12-10
* @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
* 
* require() 방식의 코드를 import 방식으로 변경
* require() 방식의 코드를 CommonJS 코드라고 하며
* import 방식으로 사용하는 코드를 ES6+ module 방식 코드라고 한다.
*/
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import session from 'express-session'
import passport from 'passport'
import poassportConfig from './modules/Passport.js'

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import cors from "cors";
import mongoose from "mongoose"
const MongoClient = require('mongodb').MongoClient


const dbConn = mongoose.connection
dbConn.once("open", ()=>{
	console.log("MongoDB OK")
})
dbConn.on("error",()=>{
	console.error()
})
mongoose.connect("mongodb://localhost:27017/users")




app.use(express.urlencoded({ extended: true }));

MongoClient.connect('mongodb+srv://1zzang:12345@cluster0.ospra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
  if (에러) return console.log(에러)
  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})

//여기 이하는 쓸데없는 app.get 이런 코드들

app.get('/', function(요청, 응답) { 
  응답.sendFile(__dirname +'/index.html')
}) 




const whiteURL = ["http://localhost:3000"]
const corsOption = {
	origin : (origin, callback)=>{
		const isWhiteURL = whiteURL.indexOf(origin) !== -1;
		callback(null, isWhiteURL);
	},
	credentials: true,
}
app.use(cors(corsOption))

// Disable the fingerprinting of this web technology. 경고
app.disable("x-powered-by");

// view engine setup
app.set('views', path.join('./views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('./public')));

// 세션 활성화
// 세션을 저장할때 어떤식으로 저장하겠다는 의미
// 매번 초기화 시켜서 저장시키는 방식
//app.use(session({secret : "aa1234", resave: true, saveUninitialized: false }))

// 쿠키를 따로 삭제기간을 정하게 하여
// 하루만 저장되고 삭제되게 설정하기
const oneDay = 1000 * 60 * 60 * 24; // 밀리초 * 60초 * 60분 * 24시간
app.use(
	session({
		secret : "a1234", // 세션의 비밀키
		resave : false,
		saveUninitialized: true,
		cookie : {
			secure: false,
			httpOnly : false,
			maxAge: oneDay,
		},
	})
)
app.use(passport.initialize()) // passport start
app.use(passport.session())
poassportConfig()

// 미들웨어 넣어주기
// response를 할때 session에 담긴 값을 클라이언트로 전송하기 위한 옵션설정

app.use((req, res, next)=>{
	// cores로 허용해준 로컬호스트를 넣어주기
	res.header("Access-Control-Allow-Origin","http://localhost:3000")
	next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
