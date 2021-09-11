const express = require("express");
const router = express.Router();
const detailController = require('../app/controllers/DetailController');
const { authRole } = require('../middleware/Userpremissions');



router.get('/create', authRole('admin'), detailController.create);
router.post('/store', detailController.store);
router.get('/:id/edit', authRole('admin'), detailController.edit);
router.put('/:id', detailController.update);
router.patch('/:id/restore', detailController.restore);
router.delete('/:id', detailController.deletesoft);
router.delete('/:id/force', detailController.deleteforce);
router.get('/:slug', detailController.show);







module.exports = router;