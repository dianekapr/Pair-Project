const express = require('express');
const router = express.Router();
const seller = require('./seller');
const cust = require('./cust');
const Seller = require('../controllers/sellerC');

router.use('/', cust);
router.use('/sellers', seller);

router.get('/register', Seller.getRegister);
router.post('/register', Seller.postRegister);
router.get('/login', Seller.getLogin);
router.post('/login', Seller.PostLogin);
router.get('/role-selection', (req, res) => {
    res.render('role-selection');
});


router.use((req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login?error=Please login first!');
    } else {
        next();
    }
});

router.get('/lobby', Seller.showLobby);

module.exports = router;
