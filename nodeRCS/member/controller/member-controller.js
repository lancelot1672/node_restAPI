//validator
const { validationResult } = require("express-validator");
const MemberService = require('../services/memberService')
exports.findLogin = async(request, response, next) =>{
    // 로그인 체크 로직
    try{
        let result = await MemberService.findLogin();
        return response.json(result);
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
    }
}
exports.existId = async(email) =>{
    try{
        let result = await MemberService.existId(email);
        return result;
    }catch(err){
        throw err;
    }
}
exports.existNickName = async(nickName) =>{
    try{
        let result = await MemberService.existNickName(nickName);
        return result;
    }catch(err){
        throw err;
    }
}