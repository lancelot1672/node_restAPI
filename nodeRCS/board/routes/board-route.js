const express = require('express');
const router = express.Router();

//controller
const BoardController = require('../controller/board-controller');

//router
router.get('/list', BoardController.js);

module.exports = router;