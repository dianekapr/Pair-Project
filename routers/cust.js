const express = require('express');
const Controller = require('../controllers/controller');
const cust = express.Router();

cust.get('/register')
cust.post('/register')
cust.get('/login')
cust.post('/login')
cust.get('/logout')
cust.get('/profile')
cust.get('/profile/setting')

cust.get('/products')
cust.get('/products/:ProductId')
cust.get('/categories')
cust.get('/orders')

module.exports = cust;