const Product = require('../model/Product')
const router = require('express').Router();

router.get('/products', async (req, res) => {

    try {

        const product = await Product.find({});

        res.status(200).json({
            success: true,
            product,
        })
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

router.put('/edit/:id',async(req,res)=>{
    try {
        const{id:productID} = req.params;
        const newData = await Product.findByIdAndUpdate({_id:productID},req.body);
        res.status(200).json({newData})
    } catch (error) {
        console.log(error);
    }
    })

module.exports = router