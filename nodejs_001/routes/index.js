// express framewrok의 객체 선언
const express = require('express');

// express framewrok에서 routing을 수행하기 위한 
// sub 객체 선언
const controller = express.Router();

/* GET home page. */
controller.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

controller.get("/home", function(req, res, next){
  res.send("Hello Korea");
})

controller.get("/json", function(req, res){

  let mData = {
    name : "홍길동",
    tel : "010-111-2222",
    age : 33
  }
  res.json(mData);

})

// 다른 js에서 import(require)하여 사용할 수 있도록
// controller 객체를 내보내기
module.exports = controller;
