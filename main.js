var express = require('express');
var app = express();
app.use(express.json());

const bcrypt = require('bcrypt');

const db = require('./lib/db/dataBase');

const {check, validationResult} = require('express-validator');

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))
app.post('/api/auth/login', async (request, response) =>{
    //이메일, 비밀번호 받기
    var body = request.body;
    db.getConnection(function(connErr, conn){
        conn.query(`select * from d_board where id=?`,[body.username],function(err,result){
            if(err){
                throw err;
            }
            bcrypt.compare(body.password, result[0].password, (err, same) => {
                // async callback
                if(same){
                    response.status(200).send(body);
                }else{
                    response.status(400).send({"message" : "아이디 혻은 비밀번호 오류"});
                }
              });
        });
        conn.release();
    });
});

app.post(
    '/api/auth/join', [
    check("username","이메일 형식이 아닙니다.").trim().bail().isEmail().custom((value, {request}) => {
        return new Promise((resolve, reject) =>{
            var length = 0;
            db.getConnection(function(connErr, connection){
 
                if(connErr){
                    console.log(connErr);
                }
                connection.query(`select * from d_board where id=?`,[value], function(error, result){
                    if(result.length > 0){
                        reject(new Error('이미 존재하는 이메일입니다.'));
                    }
                    resolve(true);
                });
                connection.release();   //Connection Pool 반환
            });
        });
    }), 
    check("password","비밀번호는 최소 8자리 이상입니다.").trim().bail().exists().isLength({min:8}),
    check("name","이름을 입력해주세요").trim().exists().not().isEmpty(),
    check("nickname","닉네임을 입력해주세요").trim().exists().custom((value, {request}) => {
        return new Promise((resolve, reject) =>{
            db.getConnection(function(connErr, connection){
                if(connErr){
                    console.log(connErr);
                }
                connection.query(`select * from d_board where nickname=?`,[value], function(error, result){
                    console.log(result.length);
                    if(result.length > 0){
                        reject(new Error('이미 존재하는 닉네임입니다.'));
                    }
                    resolve(true);
                });
                connection.release();   //Connection Pool 반환
            });
        });
    })
    ],
    async (request, response) =>{
    // Error
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        response.status(400).json({errors : errors.array()});
    }else{
        // 데이터 받기
        var body = request.body;
        console.log(body);
        
        //비밀번호 암호화
        const encryptedPassowrd = bcrypt.hashSync(body.password, 10);

        //db에 넣기
        db.getConnection(function(connErr, conn){
            if(connErr){
                throw connErr;
            }
            conn.query(`insert into d_board VALUES(?,?,?,?)`,[body.username, encryptedPassowrd, body.name, body.nickname],function(err,result){
                if(err){
                    throw err;
                }
            });
            conn.release();
        });
        //200 코드와 return
        response.status(200).send(body);
    }

});


app.listen(3000, function(){
    console.log('3000 포트에서 대기중~');
});