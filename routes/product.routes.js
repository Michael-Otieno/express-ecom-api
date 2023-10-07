const express = require('express');
const { getProduct, postProduct, getProductDetails, updateProduct, deleteProduct } = require('../controllers/product.controller');

const router = express.Router();

router.get('/',getProduct);
router.post('/add',postProduct);
router.get('/:productId',getProductDetails);
router.put('/:productId',updateProduct);
router.delete('/:productId',deleteProduct);



module.exports = router;