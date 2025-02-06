const express = require('express');
const Customer = require('../controllers/custC');
const cust = express.Router();

cust.get('/', Customer.homePage)
cust.get('/register', Customer.showRegister)
cust.post('/register', Customer.postRegister)
cust.get('/login', Customer.showLogin)
cust.post('/login', Customer.postLogin)
cust.get('/profile', Customer.profilePage)
cust.get('/profile/add', Customer.showAddProfile)
cust.post('/profile/add', Customer.postAddProfile)
cust.get('/profile/edit', Customer.showEditProfile)
cust.post('/profile/edit', Customer.postEditProfile)

cust.get('/products', Customer.showProduct)
cust.get('/products/:id', Customer.productDetail)
cust.get('/categories', Customer.categoryList)
cust.get('/orders', Customer.orders)

module.exports = cust;