const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");


exports.getProduct = (req, res) => {
    Product.findAll({include:[{model: User,attributes:["id",'username',"email"]}, {model: Category,attributes: ["id", "title"] }]}).then((products)=>{
    if (products.length === 0) {
        res.status(404).send('No products found.');
      } else {
        res.status(201).json(products);
      }
    }).catch((error) => {
        console.log(error);
        res.status(500).send('An error occurred while creating the category.');
    });
};


exports.getProductDetails = (req, res) => {
    const productId = req.params.productId;
  
    // Include User and Category when fetching the product by ID
    Product.findByPk(productId, {
      include: [
        { model: User,attributes:["id",'username',"email"] },
        { model: Category, attributes: ["id", "title"] },
      ],
    })
      .then((product) => {
        if (!product) {
          res.status(404).json({ message: 'Product not found.' });
        } else {
          res.status(200).json(product);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the product details.' });
      });
  };
  



exports.postProduct = async (req,res) => {
    try {
        const categoryId = req.body.categoryId;
        const product = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            categoryId: req.body.categoryId,
        };

        const categoryObj = await Category.findByPk(categoryId);
        const productObj = await req.user.createProduct(product);
        await productObj.setCategory(categoryObj);
        res.status(200).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.log(error);
    }
}


exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the authenticated user has permission to edit this product
    //   if (product.UserId !== req.user.id) {
    //     return res.status(403).json({ message: 'Permission denied' });
    //   }
  
      // Update the product's properties
      product.title = req.body.title; // Update the title as needed
      product.description = req.body.description; // Update other properties as needed
  
      await product.save(); // Save the updated product
  
      return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while updating the product' });
    }
  };

// DELETE a product
exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the authenticated user has permission to delete this product
    //   if (product.UserId !== req.user.id) {
    //     return res.status(403).json({ message: 'Permission denied' });
    //   }
  
      // Delete the product
      await product.destroy();
  
      return res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while deleting the product' });
    }
};