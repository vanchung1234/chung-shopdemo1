const express = require("express");
const router = express.Router();
const cartController = require('../app/controllers/CartController');

router.get('/add-to-cart/:id', cartController.cart)

router.get('/shopping-cart', cartController.viewcart)
router.get('/checkout', cartController.checkout)


module.exports = router;