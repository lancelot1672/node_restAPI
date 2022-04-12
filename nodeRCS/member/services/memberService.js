const MemberQuery = require('../../query/memberQuery');
const db = require('../../lib/db');

exports.existId = async(email) =>{
    const conn = await db.getConnection(async conn => conn);
   try {
       //이렇게 받아야함.
        const [result] = await conn.query(MemberQuery.existId,[email]);
        console.log('result',result[0].result);
        
        conn.release();
        return result[0].result;
    } catch(err) {
        console.log('Query Error');
        conn.release();
        return false;
    }
}
exports.existNickName = async(nickname) =>{
    const conn = await db.getConnection(async conn => conn);
   try {
       //이렇게 받아야함.
        const [result] = await conn.query(MemberQuery.existNinkName,[nickname]);
        
        conn.release();
        return result[0].result;
    } catch(err) {
        console.log('Query Error');
        conn.release();
        return false;
    }
}