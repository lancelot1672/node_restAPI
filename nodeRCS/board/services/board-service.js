const db = require('../../lib/db');
const BoardQuery = require('../../query/boardQuery');

exports.findAll = async() =>{
   const conn = await db.getConnection(async conn => conn);
   try {
       //이렇게 받아야함.
        const [result] = await conn.query(BoardQuery.findAll);
        conn.release();
        return result;
    } catch(err) {
        console.log('Query Error');
        conn.release();
        return false;
    }
}
exports.findById = async(pageId) =>{
    const conn = await db.getConnection(async conn => conn);
    try {
        //이렇게 받아야함.
        const [result] = await conn.query(BoardQuery.findById,[pageId]);
        console.log('result',result.le);

        //connection 반환
        conn.release();

        //넘겨주기
        return result;
     } catch(err) {
        console.log('Query Error');
        conn.release();
        return false;
     }
 }