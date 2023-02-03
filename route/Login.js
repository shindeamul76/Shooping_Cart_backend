const User = require('../model/User');
const router = require('express').Router();


router.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Exits",
            })
        }

        const matchPassword = await user.matchPassword(password);

        const token = await user.generateToken();

        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            })
        }

        const option = {expires: new Date(Date.now() + 900000), httpOnly: true }

        res.status(200).cookie('token', token, option).json({
            success: true,
            user,
            token,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }

})

module.exports = router