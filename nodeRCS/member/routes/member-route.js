const express = require('express');
const router = express.Router();

//validator
const {check, validationResult} = require('express-validator');

//암호화
const bcrypt = require('bcrypt');

//controller
const MemberController = require('../controller/member-controller');

//router
router.post('/login', MemberController.login);
router.post('/join',
[
    check("username","이메일 형식이 아닙니다.").trim().bail().isEmail().custom(async value => {
        let result = await MemberController.existId(value);

        if(result === 1){
            return Promise.reject(new Error('이미 존재하는 이메일입니다.'));
        }
    }), 
    check("password","비밀번호는 최소 8자리 이상입니다.").trim().bail().exists().isLength({min:8}),
    check("name","이름을 입력해주세요").trim().exists().not().isEmpty(),
    check("nickname","닉네임을 입력해주세요").trim().exists().custom(async value => {
        let result = await MemberController.existNickName(value);

        if(result === 1){
            return Promise.reject(new Error('이미 존재하는 닉네임입니다.'));
        }
    })
]
, MemberController.save);

module.exports = router;