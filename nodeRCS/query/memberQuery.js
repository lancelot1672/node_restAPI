exports.existId = `select count(*)>0 as result from member where id=?`;
exports.existNinkName = `select count(*)>0 as result from member where nickname=?`;
exports.save = `insert into member VALUES(?,?,?,?)`;
exports.findById = `select * from member where id=?`;