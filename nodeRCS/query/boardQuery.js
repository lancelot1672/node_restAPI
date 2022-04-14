exports.findAll = `select * from d_board`;
exports.findById = `select * from d_board where id=?`;
exports.updateBoard = `update d_board set title=?, description=? where id=?`