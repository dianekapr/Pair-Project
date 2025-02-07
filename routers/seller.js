const express = require('express');
const Seller = require('../controllers/sellerC');
const seller = express.Router();

seller.get('/register',Seller.getRegister)
seller.post('/register', Seller.postRegister)

seller.get('/login', Seller.getLogin)
seller.post('/login', Seller.PostLogin)

seller.get('/',Seller.showListProduct)
seller.get('/products/:id', Seller.getDetailProduct)

seller.get('/addProduct',Seller.addProduct)
seller.post('/addProduct', Seller.postProduct)

seller.get('/products/:id/edit', Seller.getProductEdit)
seller.post('/products/:id/edit', Seller.postProductEdit)

seller.get('/delete/:id', Seller.deleting)

module.exports = seller;
