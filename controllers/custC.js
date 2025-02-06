const { User, Profile, Product, Category, Order } = require("../models/index")

class Customer {
    static async homePage(req, res) {
        try {
            let { search } = req.query;
            let whereClause = {};
            let orderClause = [];

            if (search) {
                whereClause.name = { [Op.like]: `%${search}%` };
            }

            let categories = await Category.findAll({ limit: 5 });
            let products = await Product.findAll({ where: whereClause, order: orderClause, limit: 5 });
            res.render('custHome', { categories, products });
        } catch (error) {
            res.send(error);
        }
    }
    static async showRegister(req, res) {
        try {
            res.render('regCust', { username: '', email: '', errors: {} });
        } catch (error) {
            res.send(error);
        }
    }
    // controllers/custC.js

    static async postRegister(req, res) {
        try {
            let { username, email, password } = req.body;
            await User.create({ username, email, password, role: 'Customer' });
            res.redirect('/login');
        } catch (error) {
            let { incubatorId } = req.params;
            if (error.name === "SequelizeValidationError") {
                let errors = {};
                error.errors.forEach(err => {
                    errors[err.path] = err.message;
                });

                res.render('regCust', {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    errors: errors
                });
            } else {
                res.send(error);
            }
        }
    }
    static async showLogin(req, res) {
        try {
            res.render('loginCust')
        } catch (error) {
            res.send(error)
        }
    }
    static async postLogin(req, res) {
        try {
            let { email, password } = req.body;
            let user = await User.findOne({ where: { email, password } });
            if (user) {
                res.redirect('/');
            } else {
                res.send('Invalid email or password');
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async profilePage(req, res) {
        try {
            let user = await User.findOne({ where: { id } });
            let profile = await Profile.findOne({ where: { UserId: user.id } });
            res.render('custProfile', { user, profile });
        } catch (error) {
            res.send(error)
        }
    }

    // static async profilePage(req, res) { // chaining  // masi error gua puyeng
    //     try {
    //         User.findOne({ where: { id } })
    //             .then(user => {
    //                 if (!user) throw new Error('User not found');
    //                 return Profile.findOne({ where: { UserId: user.id } });
    //             })
    //             .then(profile => {
    //                 res.render('custProfile', { user, profile });
    //             })
    //             .catch(error => {
    //                 res.send(error);
    //             });
    //     } catch (error) {
    //         res.send(error);
    //     }
    // }

    static async showAddProfile(req, res) {
        try {
            res.render('addProfile');
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddProfile(req, res) {
        try {
            let { name, gender, bio, profilePicture, phoneNumber, bornDate } = req.body;
            await Profile.create({ name, gender, bio, profilePicture, phoneNumber, bornDate });
            res.redirect('/profile');
        } catch (error) {
            res.send(error)
        }
    }
    static async showEditProfile(req, res) {
        try {
            let profile = await Profile.findOne({ where: {} });
            res.render('editProfile', { profile });
        } catch (error) {
            res.send(error)
        }
    }
    static async postEditProfile(req, res) {
        try {
            let { name, gender, bio, profilePicture, phoneNumber, bornDate } = req.body;
            await Profile.update({ name, gender, bio, profilePicture, phoneNumber, bornDate }, { where: {} });
            res.redirect('/profile');
        } catch (error) {
            res.send(error)
        }
    }
    static async showProduct(req, res) {
        try {
            const products = await Product.findAll({
                include: [Category]
            });
            res.render('custProducts', { products, formatRupiah });
        } catch (error) {
            res.send(error)
        }
    } //
    static async productDetail(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    static async categoryList(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
    static async orders(req, res) {
        try {

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Customer

//getter middleware search eager static method op session bcrypt package promise chaining (await 2 kali dlm 1 try)