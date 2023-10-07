const express = require('express');
const { getCategory, postCategory, getCategoryDetail, deleteCategory, editCategory } = require('../controllers/category.controller');

const router = express.Router();

router.get('/',getCategory);
router.get('/:categoryId', getCategoryDetail);
router.post('/add', postCategory);
router.delete('/:categoryId', deleteCategory);
router.put('/:categoryId', editCategory);


module.exports = router;