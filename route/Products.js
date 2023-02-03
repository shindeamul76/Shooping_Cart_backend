const Product = require('../model/Product');
const router = require('express').Router();


router.post('/products/post', async (req, res) => {

    try {

        const { name, price,  image} = req.body;

        const user = await Product.create({ name, price, image});

        res.status(201).json({
            success: true,
            user,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

})

module.exports = router