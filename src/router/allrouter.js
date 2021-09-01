const express = require("express");
const router = express.Router();
const allController = require('../app/controllers/AllController');



router.get('/all', allController.index);
router.get('/search', allController.search);
router.get('/:use', allController.category);






module.exports = router;