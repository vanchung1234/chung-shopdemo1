const express = require("express");
const router = express.Router();
const newsController = require('../app/controllers/newsController');



router.get('/intro', newsController.show);
router.get('/contact', newsController.contact);





module.exports = router;