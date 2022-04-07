//mysql Connection pool
const mysql = require('mysql');

//DB 설정 파일
const config = require('./db_config.json');

const connection = mysql.createPool(config);

module.exports = connection;
