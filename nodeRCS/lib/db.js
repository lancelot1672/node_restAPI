//mysql Connection pool
const mysql = require('mysql2/promise');

//DB 설정 파일
const config = require('../config/db_config.json');

const connection = mysql.createPool(config);

module.exports = connection;
