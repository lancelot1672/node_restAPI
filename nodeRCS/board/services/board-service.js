const db = require('../../lib/db');
const BoardQuery = require('../../query/boardQuery');

exports.findAll = async() =>{
   const conn = await db.getConnection(async conn => conn);
   try {
       //이렇게 받아야함.
        const [result] = await conn.query(BoardQuery.findAll);
        return result;
    } catch(err) {
        console.log('Board findAll Query Error');
        throw err;
    }finally{
        conn.release();
     }
}
exports.findById = async(pageId) =>{
    const conn = await db.getConnection(async conn => conn);
    try {
        //이렇게 받아야함.
        const [result] = await conn.query(BoardQuery.findById,[pageId]);
        console.log('result',result.le);

        //넘겨주기
        return result;
     } catch(err) {
        console.log('Query Error');
        throw err;

     }finally{
        conn.release();
     }
 }
 exports.updateBoard = async(body) =>{
    //글 제목, 내용을 받아 글 수정
    const conn = await db.getConnection(async conn => conn);
    try{
        const [result] = await conn.query(BoardQuery.updateBoard, [body.title, body.description, body.id]);
        
    }catch(err){
        console.log('Board Update Query Error');
        throw err;
    }finally{
        conn.release();
     }
 }