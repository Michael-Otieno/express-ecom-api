const express = require('express');
const { getCategoryPage, postCategoryPage } = require('../controllers/category.controller');

const router = express.Router();

router.get('/',getCategoryPage);
router.post('/add', postCategoryPage);

module.exports = router;