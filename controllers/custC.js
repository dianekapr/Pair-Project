const { User, Profile, Product, Category, Order } = require("../models/index")
const {Op} = require('sequelize')
const bcrypt = require("bcryptjs");


class Customer {
    static async homePage(req, res) {
        try {
            let products = await Product.findAll({ include: Category });
            let categories = await Category.findAll(); // Fetch categories
    
            res.render("custHome", { products, categories, title: "Home - Sopi" });
        } catch (error) {
            res.send(error);
        }
    }
    
    static async getRegister(req, res) {
        res.render('register', { role: 'customer' });
    }

    static async postRegister(req, res) {
        try {
            const { username, email, password } = req.body;
            await User.create({ username, email, password, role: 'Customer' });
            res.redirect('/login');
        } catch (error) {
            res.send(error);
        }
    }

    static async getLogin(req, res) {
        res.render('login', { role: 'customer', error: req.query.error });
    }

    static async postLogin(req, res) {
        try {
            console.log("Login attempt:", req.body);
    
            const { email, password } = req.body;
            if (!email || !password) {
                return res.redirect('/login?error=Email and Password required');
            }
    
            const user = await User.findOne({ where: { email, role: "Customer" } });
            console.log("User found:", user);
    
            if (!user) {
                return res.redirect("/login?error=User not found");
            }
    
            // console.log("Entered Password:", password);
            // console.log("Stored Hashed Password:", user.password);
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            // console.log("Password valid:", isPasswordValid);
    
            if (!isPasswordValid) {
                return res.redirect("/login?error=Invalid Email or Password");
            }
    
            req.session.user = { id: user.id, username: user.username, role: user.role };
            res.redirect("/");
        } catch (error) {
            console.error("Login Error:", error);
            res.send(error);
        }
    }

    static async profilePage(req, res) {
        try {
            let user = await User.findOne({ where: { id: req.session.user.id } });
            let profile = await Profile.findOne({ where: { UserId: user.id } });
            res.render('custProfile', { user, profile });
        } catch (error) {
            res.send(error);
        }
    }


    static async showAddProfile(req, res) {
        try {
            res.render('custProfileAdd');
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddProfile(req, res) {
        try {
            console.log("Uploaded File:", req.file); // Debugging
    
            let { name, gender, bio, phoneNumber, bornDate } = req.body;
            let profilePicture = req.file ? `/uploads/${req.file.filename}` : null; // Ensure the path has "/uploads/"
    
            const newProfile = await Profile.create({
                name,
                gender,
                bio,
                profilePicture,
                phoneNumber,
                bornDate,
                UserId: req.session.user.id
            });
    
            console.log("Saved Profile:", newProfile); // Debugging
            res.redirect('/profile');
        } catch (error) {
            console.error("Error in postAddProfile:", error);
            res.send(error);
        }
    }
    
    
    

    static async showEditProfile(req, res) {
        try {
            let profile = await Profile.findOne({ where: { UserId: req.session.user.id } });
            res.render('custProfileEdit', { profile });
        } catch (error) {
            res.send(error);
        }
    }

    static async postEditProfile(req, res) {
        try {
            let { name, gender, bio, phoneNumber, bornDate } = req.body;
            let profilePicture = req.file ? `/uploads/${req.file.filename}` : req.body.existingProfilePicture;

            await Profile.update(
                { name, gender, bio, profilePicture, phoneNumber, bornDate },
                { where: { UserId: req.session.user.id } }
            );

            res.redirect('/profile');
        } catch (error) {
            res.send(error);
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
    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    throw new Error("Logout failed");
                }
                res.redirect('/login');
            });
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = Customer

//getter middleware search eager static method op session bcrypt package promise chaining (await 2 kali dlm 1 try)