const express = require('express');
const app = express();

const route = require('./board/routes/board-route');

app.use('/api/',route);

app.listen(3000, () =>{
    console.log('3000 포트에서 댁이중~');
});