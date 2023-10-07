const Category = require("../models/Category");
const User = require("../models/User");


exports.getCategoryPage = (req, res) => {
    Category.findAll({include:User}).then((categories)=>{
        console.log(categories);
    }).catch((error) => {
        console.log(error);
      });
    
  };


  exports.postCategoryPage = (req, res) => {
    const title = req.body.title;
    console.log(req.user);
    req.user.createCategory({ title }).then((category) => {
      console.log(category);
    }).catch((error) => {
      console.log(error);
    });
  };


//   exports.postCategoryPage = (req, res) => {
//     console.log('req.user:', req.user); // Check if req.user is set correctly
//     const title = req.body.title;
//     req.user.createCategory({ title }).then((category) => {
//       console.log(category);
//     }).catch((error) => {
//       console.log(error);
//     });
//   };
  