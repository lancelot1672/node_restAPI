const BoardService = require('../services/board-service');

exports.updateBoard = async (request, response, next) =>{
    var body = request.body;
    try{
        let result = await BoardService.updateBoard(body);

        return response.status(200).json({"result":"success"});

    }catch(err){
        console.log(err);
        console.log(typeof(err));
        return response.status(500).json({"message":err.message});
    }
}
exports.deleteBoard = async (request, response, next) =>{
    var id = request.params.pageId;
    try{
        let result = await BoardService.deleteBoard(id);

        return response.status(200).json({"result":"success"});

    }catch(err){
        console.log(err);
        console.log(typeof(err));
        return response.status(500).json({"message":err.message});
    }
}
exports.findAll = async(request, response, next) =>{
    try{
        let result = await BoardService.findAll();
        console.log('findAll :',result);
        return response.status(200).json(result);
    }catch(err){
        console.log(err);
        return response.status(500).json(err);
    }
}
exports.findById = async(request, response, next) =>{
    var pageId = request.params.pageId;
    try{
        let result = await BoardService.findById(pageId);
        return response.status(200).json(result);
    }catch(err){
        console.log(err);
        return response.status(500).json(err);
    }
}