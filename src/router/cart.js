const express = require("express");
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.get('/add-to-cart/:id', cartController.cart);
router.get('/add/:id', cartController.add);
router.get('/shopping-cart', cartController.viewcart);
router.get('/reduce/:id', cartController.reduce);
router.get('/remove/:id', cartController.remove);
router.get('/checkout', cartController.checkout);
router.post('/thanks', cartController.thanks);


module.exports = router;