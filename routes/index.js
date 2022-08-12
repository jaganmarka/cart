var express = require('express');
var router = express.Router();
const { cartController } = require('../controllers/cartController');
const { cartProductsController } = require('../controllers/cartProductsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function(req, res, next) {
  res.send({message: "pong"});
});

// Create APIs to perform operations on cart.
// Add products
// Delete product
// Update qty
// Fetch by user
router.post('/carts', cartController.addProductsToCart);
router.post('/cart/products', cartProductsController.addProductsToExistingCart);
router.delete('/cart/:cartId/product/:productId', cartProductsController.deleteProductFromCart);
router.put('/cart/:cartId/product/:productId', cartProductsController.updateProductQuantity);
router.get('/cart/user/:userId', cartController.getUserCarts);

module.exports = router;
