const express = require('express');
const { getCategory, postCategory, getCategoryDetail, deleteCategory } = require('../controllers/category.controller');

const router = express.Router();

router.get('/',getCategory);
router.get('/:categoryId', getCategoryDetail);
router.post('/add', postCategory);
router.delete('/:categoryId', deleteCategory);


module.exports = router;