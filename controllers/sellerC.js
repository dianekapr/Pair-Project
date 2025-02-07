const {Product,Category,User,Profile} = require ("../models/index")
const bcrypt = require(`bcryptjs`) 

class Seller{

    static async showListProduct (req, res){
        try {

            let data = await Product.findAll({
                include: Category
            })

            res.render ('sellerHome', {data, title: 'sellerHome'})

        } catch (error) {
            console.log(error);
            res.send (error)
        }
    }

    static async getRegister (req, res) {
        try {

            res.render ('addRegisterPost',)

        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister (req, res) {
        try {

            let {
                username,
                email,
                password,
                role
            } = req.body

            await User.create({
                username,
                email,
                password,
                role
            }) 
            res.redirect('/login')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async showLobby(req, res){
        try {

            res.render(`lobby`)
        } catch (error) {
            res.send(error)
        }
    }

    static async getLogin(req, res){
        try {
            let {error} = req.query
            res.render(`addLoginPost`, {error})
        } catch (error) {
            res.send(error)
        }
    }

    static async PostLogin(req, res){
        try {
            let {email, password} = req.body

            if(!email || !password) throw `Invalid Email / Password, please Check your input `
            
            let user = await User.findOne({
                where: {email : email}
            })
            
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password);
                
                if (isValidPassword) {

                    req.session.user = {id: user.id, userName: user.userName, email: user.email, role: user.role}
                    return res.redirect('/lobby')
                }else{
                    const error = "Invalid Email / Password, please Check your input"
                    return res.redirect(`/login?error=${error}`)
                }

            } 

        } catch (error) {
            if(error === 'Invalid Email / Password, please Check your input '){
                res.redirect(`/login?error=${error}`)
            }else{
                res.send(error)
            }
        }
    }
    static async getDetailProduct (req, res){
        try {
            let {id} = req.params
            let data = await Product.findOne({
                where: {id : id}
            })
            // res.send(data)

            res.render(
                'detailSellersProduct', {
                    data,
                    title : 'detailSellersProduct'
            })  
        } catch (error) {
            console.log(error);
            res.send (error)
        }
    }

    static async addProduct (req, res){
        try {

            let data = await Product.findAll({
                include: Category
            })
            res.render ('addProduct', {data, title: 'addProduct'})

        } catch (error) {
            res.send(error)
        }
    }

    static async postProduct (req, res){
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

    static async getProductEdit (req, res){
        try {
            let {CategoryId} = req.params
            // let {id}= req.params
            let data = await Product.findOne({where: {id}})
            // let Category = await Category.findOne({where: {id: CategoryId}})

            res.render ('editProduct', {data, title: 'editProduct'})

        } catch (error) {
            res.send(error)
        }
    }

    static async getProductEdit (req, res){
        try {
            let {id}= req.params
            let data = await Product.findOne({
                where: {id}
            })

            res.render ('editProduct', {data, title: 'editProduct'})

        } catch (error) {
            res.send(error)
        }
    }

    static async postProductEdit (req, res){
        try {
            
            let {
                name,
                description,
                price,
                imageUrl
            } = req.body
            let {id} =req.params
            let data = await Product.findOne({
                where: {id}
            })

            await data.update({
                name,
                description,
                price,
                imageUrl
            })

            res.redirect('/sellers')

        } catch (error) {
            res.send(error)
        }
    }

    static async  deleting (req, res){
        try {
            let {id}= req.params
            let data = await Product.findOne({
                where: {id}
            })
            await data.destroy()
            res.redirect ('/sellers')
            
        } catch (error) {
            res.send (error)
        }
    }




}

module.exports = Seller
