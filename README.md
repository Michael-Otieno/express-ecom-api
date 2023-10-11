# express-ecom-api
- Express js and MySql API.

## Features
- Register and Login as a user
- Access route based on role.
- Get the list of products, and product details, and update and delete a product.
- Get a list of categories, and category details, and update and delete a product.
- 

## Requirements
- Nodejs
- MySQL

## Set up and Installation
- Clone the repository
```bash
git clone https://github.com/Michael-Otieno/express-ecom-api/
```
 - Install dependencies
  ```bash
npm install bcryptjs body-parser cors express express-session jsonwebtoken mysql2 nodemon passport passport-local sequelize
 ```
 - Run project
  ```bash
npm start
 ```
- Url
```bash
http://localhost:8080/
```
 ## Structure
 | Endpoint | HTTP Method   | CRUD Method  | Result |
| :---:   | :---: | :---: |:---: |
| `api/auth/signup` | POST   | CREATE  |Register a user |
| `api/auth/signin` | POST  | POST |Login a user |
| `products/` | GET  | GET | Get a list of all products |
| `products/add` | POST  | CREATE |Add a product |
| `products/:id` | GET | GET |Get product detail |
| `products/:id` | PUT | UPDATE |Update product detail |
| `products/:id` | DELETE  | DELETE |Delete product |
| `categories/` | GET  | GET | Get a list of all categories |
| `categories/add` | POST | CREATE |Add a category |
| `categories/:id` | GET | GET |Get category detail |
| `categories/:id` | PUT | UPDATE |Update category detail |
| `categories/:id` | DELETE  | DELETE |Delete category |


## Use
- Use [Postman](https://www.postman.com/) for testing the Rest API

## License
* [![License](https://img.shields.io/packagist/l/loopline-systems/closeio-api-wrapper.svg)](https://github.com/michael-otieno/Picture-Globe/blob/master/LICENSE)  
* Copyright (c) 2019 **Michael Otieno**
