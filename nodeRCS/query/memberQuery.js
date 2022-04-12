exports.existId = `select count(*)>0 as result from member where id=?`;
exports.existNinkName = `select count(*)>0 as result from member where nickname=?`;