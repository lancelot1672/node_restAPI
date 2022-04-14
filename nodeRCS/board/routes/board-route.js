const express = require('express');
const router = express.Router();

//controller
const BoardController = require('../controller/board-controller');

//router
router.get('/list', BoardController.findAll);
router.get('/list/:pageId', BoardController.findById);
router.put('/update', BoardController.updateBoard);
module.exports = router;