const express = require('express');
const app = express();

// express에는 json 데이터를 파싱하는 모듈이 내장되어있다.
// 하지만 json만 되고 x-www-form-urlencoded를 파싱하기 위해서 아래를 확장해야 한다.
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const boardRoute = require('./board/routes/board-route');
const memberRoute = require('./member/routes/member-route');
app.use('/api/auth', memberRoute);
app.use('/api',boardRoute);

app.listen(3000, () =>{
    console.log('3000 포트에서 댁이중~');
});