const app = express();
const express = require('express');
const MongoClient = require('mongodb').MongoClient

app.use(express.urlencoded({ extended: true }));


MongoClient.connect('mongodb+srv://1zzang:as1233@cluster0.ospra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
  if (에러) return console.log(에러)
  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})

//여기 이하는 쓸데없는 app.get 이런 코드들

app.get('/', function(요청, 응답) { 
  응답.sendFile(__dirname +'/index.html')
}) 
