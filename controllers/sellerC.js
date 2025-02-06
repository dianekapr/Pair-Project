const {Product,Category,User,Profile} = require ("../models/index")

class Seller{

    static async showListProduct (req, res){
        try {

            let data = await Product.findAll()
            res.render ('sellerHome', {data, title: 'sellerHome'})

        } catch (error) {
            console.log(error);
            res.send (error)
        }
    }

    static async getRegister (req, res) {
        try {

            let data = await User.findAll()
            res.send (data)
            // res.render ('addRegisterPost', {data, title: 'addRegisterPost'})

        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister (req, res) {
        try {

            let {
                username,
                email,
                password
            } = req.body

            await User.create({
                username,
                email,
                password
            })

            res.redirect('/sellers/register')

        } catch (error) {
            res.send(error)
        }
    }

    static async getSellersLogin (req, res){
        try {

            let data = await User.findAll()
            res.send (data)
            // res.render ('addSellersPost', {data, title: 'addSellersPost'})

        } catch (error) {
            res.send(error)
        }
    }

    static async postSellersLogin (req, res){
        try {

            let {
                email,
                password
            } = req.body

            await User.create({

                email,
                password
            })

            res.redirect('/sellers/register')

        } catch (error) {
            res.send(error)
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

            let data = await Product.findAll()
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
                imageUrl
            } = req.body

            await Product.create({

                name,
                description,
                price,
                imageUrl
            })

            res.redirect('/sellers')

        } catch (error) {
            console.log(error);
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




}

module.exports = Seller
