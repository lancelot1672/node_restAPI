var express = require('express');
var app = express();
app.use(express.json());

const {check, validationResult} = require('express-validator');

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.urlencoded({
  extended: true
}))

app.post(
    '/api/auth/join', [
    check("username","이메일 형식이 아닙니다.").trim().bail().isEmail(), 
    check("password","비밀번호는 최소 8자리 이상입니다.").trim().bail().exists().isLength({min:8}),
    check("name","이름을 입력해주세요").trim().not().exists().isEmpty()
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
        
        //db에 넣기

    //200 코드와 return
        response.status(200).send(body);
    }

});

app.get('api/auth/login', function(request, response){

});

app.listen(3000, function(){
    console.log('3000 포트에서 대기중~');
})