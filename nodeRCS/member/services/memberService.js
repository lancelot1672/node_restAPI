const MemberQuery = require('../../query/memberQuery');

//db
const db = require('../../lib/db');

//암호화
const bcrypt = require('bcrypt');
const { response } = require('express');

exports.existId = async(email) =>{
    //id 중복체크
    const conn = await db.getConnection(async conn => conn);
   try {
       //이렇게 받아야함.
        const [result] = await conn.query(MemberQuery.existId,[email]);
        console.log('result',result[0].result);
        
        conn.release();
        return result[0].result;
    } catch(err) {
        console.log('Query Error');
        conn.release();
        return false;
    }
}
exports.existNickName = async(nickname) =>{
    //email 중복체크
    const conn = await db.getConnection(async conn => conn);
   try {
       //이렇게 받아야함.
        const [result] = await conn.query(MemberQuery.existNinkName,[nickname]);
        
        conn.release();
        return result[0].result;
    } catch(err) {
        console.log('Query Error');
        conn.release();
        return false;
    }
}
exports.save = async(body) =>{
    //회원가입
    const conn = await db.getConnection(async conn => conn);
    
    //비밀번호 암호화
    var encryptedPassowrd = bcrypt.hashSync(body.password, 10);

    try{
        const [result] = await conn.query(MemberQuery.save,[body.username, encryptedPassowrd, body.name, body.nickname]);

        console.log(result);

        return body;
    }catch(err){
        console.log('Query Error');
        conn.release();
        return false;
    }
}
exports.login = async(body) =>{
    //로그인
    const conn = await db.getConnection(async conn => conn);
    try{
        const [result] = await conn.query(MemberQuery.findById,[body.username]);

        console.log(result[0]);
        //비밀번호 검증
        try{
            const same = await bcrypt.compare(body.password, result[0].password);
            if(same){
                return result[0];
            }
        }catch(err){

        }
    }catch(err){
        console.log('Query Error');
        return false;
    }finally{
        conn.release();
    }
}