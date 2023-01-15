const express = require('express');

const productController = require('../controllers/ProductController');
const protect = require('../middlewares/protect');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(protect, productController.addNewProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
