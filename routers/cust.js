const express = require('express');
const Customer = require('../controllers/custC');
const cust = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

cust.get('/', Customer.homePage);
cust.get('/register', Customer.getRegister);
cust.post('/register', Customer.postRegister);
cust.get('/login', Customer.getLogin);
cust.post('/login', Customer.postLogin);
cust.post('/logout', Customer.logout)
cust.get('/profile', Customer.profilePage);
cust.get('/profile/add', Customer.showAddProfile);
cust.post('/profile/add', upload.single('profilePicture'), Customer.postAddProfile);
cust.get('/profile/edit', Customer.showEditProfile);
cust.post('/profile/edit', upload.single('profilePicture'), Customer.postEditProfile);

cust.get('/products', Customer.showProduct)
cust.get('/products/:id', Customer.productDetail)
cust.get('/categories', Customer.categoryList)
cust.get('/orders', Customer.orders)

module.exports = cust;