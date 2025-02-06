const express = require('express');
const Controller = require('../controllers/custC');
const seller = express.Router();

seller.get('/register')
seller.post('/register')
seller.get('/login')
seller.post('/login')
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

module.exports = seller;