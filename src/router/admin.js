const express = require("express");
const router = express.Router();
const adminController = require('../app/controllers/adminController');
const { authRole } = require('../middleware/Userpremissions');

router.get('/storeditems', authRole('admin'), adminController.show)
router.get('/trash', authRole('admin'), adminController.trash)


module.exports = router;