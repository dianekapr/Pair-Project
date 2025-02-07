const { Product, Category, User, Profile } = require("../models/index")
const bcrypt = require('bcryptjs');
const { timeFormat } = require('../helpers/timeFormat')

class Seller {
    static async showListProduct (req, res){
        try {
            
            let data = await Product.findAll({include: Category})
            
            res.render ('sellerHome', {data, title: 'sellerHome'})

        } catch (error) {
            console.log(error);
            res.send (error)
        }
    }

    static async getRegister(req, res) {
        res.render('register', { role: 'seller' });
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body;
            await User.create({ username, email, password, role: 'Seller' });
            res.redirect('/sellers/login');
        } catch (error) {
            res.send(error);
        }
    }

    static async getLogin(req, res) {
        res.render('login', { role: 'seller', error: req.query.error });
    }

    static async postLogin(req, res) {
        try {
            console.log(req.body); // Debugging: Check if req.body contains email & password

            const { email, password } = req.body;
            if (!email || !password) {
                return res.redirect('/sellers/login?error=Email and Password required');
            }

            const user = await User.findOne({ where: { email, role: "Seller" } });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.redirect("/sellers/login?error=Invalid Email or Password");
            }

            req.session.user = { id: user.id, username: user.username, role: user.role };
            res.redirect("/sellers");
        } catch (error) {
            res.send(error);
        }
    }

    static async showLobby(req, res) {
        try {
            res.render("lobby", { title: "Lobby" });
        } catch (error) {
            res.send(error);
        }
    }

    static async getDetailProduct(req, res) {
        try {
            let { id } = req.params
            let data = await Product.findOne({
                where: { id: id }
            })
            // res.send(data)

            res.render(
                'detailSellersProduct', {
                data,
                title: 'detailSellersProduct'
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addProduct(req, res) {
        try {

            let data = await Product.findAll({
                include: Category
            })
            res.render('addProduct', { data, title: 'addProduct' })

        } catch (error) {
            res.send(error)
        }
    }

    static async postProduct(req, res) {
        try {
            console.log(req.body);
            let {
                name,
                description,
                price,
                imageUrl,
                CategoryId
            } = req.body

            await Product.create({

                name,
                description,
                price,
                imageUrl,
                CategoryId
            })

            res.redirect('/sellers')

        } catch (error) {
            res.send(error)
        }
    }

    static async getProductEdit(req, res) {
        try {
            let { CategoryId } = req.params
            let { id } = req.params
            let data = await Product.findOne({ where: { id } })
            let Category = await Category.findOne({ where: { id: CategoryId } })

            res.render('editProduct', { data, title: 'editProduct' })

        } catch (error) {
            res.send(error)
        }
    }

    static async postProductEdit(req, res) {
        try {
            let { CategoryId } = req.params
            let { id } = req.params
            let {
                name,
                description,
                price,
                imageUrl
            } = req.body

            await data.update({
                name,
                description,
                price,
                imageUrl,
                CategoryId: CategoryId
            }, {
                where: {
                    id: id
                }
            })

            res.redirect('/sellers')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async deleting(req, res) {
        try {
            let { id } = req.params
            let data = await Product.findOne({
                where: { id }
            })
            await data.destroy()
            res.redirect('/sellers')

        } catch (error) {
            res.send(error)
        }
    }




}

module.exports = Seller
