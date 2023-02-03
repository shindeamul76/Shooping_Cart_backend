
const router = require('express').Router();

router.get('/logout', async (req, res) => {

    try {

        res.status(200).cookie('token', null).json({
            success: true,
            message: "User logout successfully"
        })
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router