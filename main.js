var express = require('express');
const connection = require('./lib/db/dataBase');
var app = express();
app.use(express.json());

//db
const db = require('./lib/db/dataBase');

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))

//로그인, 회원가입
const auth = require('./route/auth/auth');
app.use('/api/auth', auth);

app.get(`/api/board`, (request, response) =>{
    //게시물 전체 출력(가져오기)
    db.getConnection((connErr, connection) =>{
        connection.query(`select * from d_board`, (err, result)=>{
            if(err){
                throw err;
            }
            if(result.length === 0){
                response.status(400).send({"message" : "게시물이 없습니다."});
            }
            response.status(200).send(result);
        });
        connection.release();
    });
});
app.get(`/api/board/:pageId`, (request,response) =>{
    //id값
    var pageId = request.params.pageId;
    console.log(pageId);

    //id값 별로 가져오기
    db.getConnection((connErr, connection) =>{
        connection.query(`select * from d_board where id=?`,[pageId], (err, result)=>{
            if(err){
                throw err;
            }
            if(result.length === 0){
                response.status(400).send({"message" : "게시물이 없습니다."});
            }
            response.status(200).send(result);
        });
        connection.release();
    });
});
app.listen(3000, function(){
    console.log('3000 포트에서 대기중~');
});