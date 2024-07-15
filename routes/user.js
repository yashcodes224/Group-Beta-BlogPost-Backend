const express = require('express');
const router = express.Router();
const blogController = require('../controllers/user');
const blog = require('../models/user');
//const { authenticateAdminToken, authenticateToken} = require('../middleware/auth');


// Blog Registration
router.post('/create', blogController.create);

// Product Details
router.get('/getAllBlogs', blogController.getAllBlogs);

// Product Fetch
router.get('/fetch/:id', blogController.fetch)

// Update Product
router.put('/update/:id', blogController.update);

// Delete Product
router.delete('/delete/:id', blogController.deleteBlog);

module.exports = router;
