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
        return response.status(200).send(result);
    }catch(err){
        return response.status(400).json(err);
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

        response.status(200).send(result);
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