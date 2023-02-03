const User = require('../model/User');
const router = require('express').Router();


router.post('/register', async (req, res) => {

    try {

        const {username, password, confimPassword} = req.body;

    let user = await User.findOne({username});

    if(user) {
       return res.status(400).json({
            success: false,
            message: "User Already Exits"
        })
    }

    if(password !== confimPassword) {
       return  res.status(400).json({
            success: false,
            message: "Password dosn't match"
        })
    }

     user = await User.create({username, password})


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


