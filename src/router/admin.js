const express = require("express");
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/storeditems', adminController.show)
router.get('/trash', adminController.trash)


module.exports = router;