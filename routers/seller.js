const express = require('express');
const Controller = require('../controllers/controller');
const Seller = require('../controllers/sellerC');
const seller = express.Router();

seller.get('/register')
seller.post('/register')
seller.get('/login')
seller.post('/login')
seller.get('/logout')
seller.get('/profile')
seller.get('/profile/setting')
seller.post('/profile/setting')

seller.get('/products')
seller.get('/products/:ProductId')
seller.get('/addProduct')
seller.post('/addProduct')
seller.get('/products/:ProductId/edit')
seller.get('/products/:ProductId/edit')
seller.get('/categories')

seller.get('/register',Seller.getRegister)
seller.post('/register', Seller.postRegister)

seller.get('/login', Seller.getSellersLogin)
seller.post('/login', Seller.postSellersLogin)

seller.get('/',Seller.showListProduct)
seller.get('/products/:id', Seller.getDetailProduct)

seller.get('/addProduct',Seller.addProduct)
seller.post('/addProduct', Seller.postProduct)

seller.get('/products/:id/edit', Seller.getProductEdit)
seller.post('/products/:id/edit', Seller.postProductEdit)

seller.get('/delete')

module.exports = seller;
