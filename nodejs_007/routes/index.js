const express = require('express');
const router = express.Router();
// models folder에서 정보를 읽어서
// tbl_bbs 객체를 사용할 수 있도록 선언, 초기화
// models/index.js 는 models 폴더에 있는
// table 설정과 관련된 파일들을 읽어서
// 객체로 return을 한다.
// return 된 객체에서 table객체 요소만 추출하여
// 사용하도록 전개연산을 수행한다.
const {tbl_bbs} = require("../models/index")

/* GET home page. */
router.get('/', function(req, res, next) {

  // findAndCountAll - 관계없이 모든 데이터를 추출하는 함수
  tbl_bbs.findAndCountAll().then((result)=>{
    console.log(result);
    res.render('index', {BBS : result.rows});
  })

  
});

module.exports = router;
