const BoardService = require('../services/board-service');

// exports.updateBoard = async (request, response, next) =>{

// }
exports.findAll = async(request, response, next) =>{
    try{
        let result = await BoardService.findAll();
        console.log('1',result);
        return response.json(result);
    }catch(err){
        console.log(err);
        return response.status(500).json(err);
    }
}
exports.findById = async(request, response, next) =>{
    var pageId = request.params.pageId;
    try{
        let result = await BoardService.findById(pageId);
        return response.json(result);
    }catch(err){
        console.log(err);
        return response.status(500).json(err);
    }
}
// async (req, res, next) => {
//     let { boardId } = req.params
//     try {
//         let rows = await BoardService.getBoard(boardId)
//         return res.json(rows[0])
//     } catch (err) {
//         return res.status(500).json(err)
//     }
// }