const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('We are on login');
});

router.post('/', async (req, res) => {
    try{
        const user = await User.findOne({login: req.body.login})
        if (user == null) {
            return res.status (400).send('Cannot find user')
        }
        if(await bcrypt.compare(req.body.password, user.password)) {
            try{
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
                res.send({access_token:accessToken, user: user})
            }catch(err){
                console.log(err);
            }
            
            
        } else {
            res.send('Not Allowed')
        }

    }catch(err){
        res.status(500).send()
    }
})

module.exports = router;