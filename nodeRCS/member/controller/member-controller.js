//validator
const { validationResult } = require("express-validator");

//service
const MemberService = require('../services/memberService')

exports.login = async(request, response, next) =>{
    //id, password 받기
    var body = request.body;

    // 로그인 체크 로직
    try{
        let result = await MemberService.login(body);
        // res.send
        // res.send json send 과정 호출
        // res.json
        // res.json send 과정 호출
        return response.status(200).json(result);
        //return을 사용하면 여기서 끝.

        console.log('호출될까??');

    }catch(err){
        response.status(400).json({"message":"아이디 비밀번호 확인"});
    }
}
exports.save = async(request, response) =>{
    //유효성 검사
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({errors : errors.array()});
    }else{
        // 데이터 받기
        var body = request.body;
        console.log(body);

        let result = await MemberService.save(body);

        return response.status(200).json(result);
    }
}
exports.existId = async(email) =>{
    // 아이디(이메일) 중복 체크
    try{
        let result = await MemberService.existId(email);
        return result;
    }catch(err){
        throw err;
    }
}
exports.existNickName = async(nickName) =>{
    // 닉네임 중복 체크
    try{
        let result = await MemberService.existNickName(nickName);
        return result;
    }catch(err){
        throw err;
    }
}