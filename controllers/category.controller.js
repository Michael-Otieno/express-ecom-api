const Category = require("../models/Category");
const User = require("../models/User");


exports.getCategory = (req, res) => {
    Category.findAll({include:User}).then((categories)=>{
      res.status(201).json(categories);
    }).catch((error) => {
        console.log(error);
        res.status(500).send('An error occurred while creating the category.');
    });
};

exports.getCategoryDetail = (req,res) => {
  const categoryId = req.params.categoryId
  Category.findByPk(categoryId).then((category) => {
    res.status(201).json(category);
  }) .catch((error) => {
    console.log(error);
  });

}


// Update a category
exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the authenticated user has permission to edit this category
    // if (category.UserId !== req.user.id) {
    //   return res.status(403).json({ message: 'Permission denied' });
    // }

    // Update the category's properties
    category.title = req.body.title; // Update the title as needed
    // You can update other properties here

    await category.save(); // Save the updated category

    return res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the category' });
  }
};



exports.postCategory = (req, res) => {
  const title = req.body.title;
  req.user.createCategory({ title }).then((category) => {
    res.status(201).json({ message: 'Category created successfully' });
  }).catch((error) => {
    res.status(500).send('Category already exists.');
  });
};


// DELETE a category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the authenticated user has permission to delete this category
    // if (category.UserId !== req.user.id) {
    //   return res.status(403).json({ message: 'Permission denied' });
    // }

    // Delete the category
    await category.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while deleting the category' });
  }
};
