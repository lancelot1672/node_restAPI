const express = require('express');
const router = express.Router();

//db
const db = require('../../lib/db/dataBase');

//validator
const {check, validationResult} = require('express-validator');

//암호화
const bcrypt = require('bcrypt');

router.post('/login', async (request, response) =>{
    //이메일, 비밀번호 받기
    var body = request.body;
    db.getConnection(function(connErr, conn){
        if(connErr){
            throw connErr;
        }
        conn.query(`select * from member where id=?`,[body.username],function(err,result){
            if(err){
                throw err;
            }
            if(result.length === 0){
                response.status(400).send({"message" : "일치하는 계정이 없습니다."});
            }else{
                bcrypt.compare(body.password, result[0].password, (err, same) => {
                    // async callback
                    if(same){
                        response.status(200).send(body);
                    }else{
                        response.status(400).send({"message" : "아이디 혹은 비밀번호 오류"});
                    }
                  });
            }
        });
        conn.release();
    });
});

router.post(
    '/join', [
    check("username","이메일 형식이 아닙니다.").trim().bail().isEmail().custom((value, {request}) => {
        return new Promise((resolve, reject) =>{
            var length = 0;
            db.getConnection(function(connErr, connection){
 
                if(connErr){
                    console.log(connErr);
                }
                connection.query(`select * from member where id=?`,[value], function(error, result){
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
                connection.query(`select * from member where nickname=?`,[value], function(error, result){
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
            conn.query(`insert into member VALUES(?,?,?,?)`,[body.username, encryptedPassowrd, body.name, body.nickname],function(err,result){
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

module.exports = router;