const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const auth = require('../middlewares/auth')

//Get users
router.get('/', auth, async (req, res) => {

    try {
        const users = await User.find({}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }).select("-password")
    }catch(err){
        console.log(err);
    }
});

//Get users by id
router.get('/id/:userId', auth, async (req, res) => {
    try {
        const users = await User.findById(req.params.userId, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }).select("-password")
    }catch(err){
        console.log(err);
    }
});

//Get users by username
router.get('/username/:username', async (req, res) => {
    console.log(req.params.username);
    try {
        const users = await User.findOne({name : req.params.username}, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }).select("-password")
    }catch(err){
        console.log(err);
    }
});

//Create a new User
router.post('/', async (req, res) => {


    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            login: req.body.login,
            password: hashedPassword,
            friends: req.body.friends,
            role: req.body.role,
            name: req.body.name
        });

        const savedUser = await user.save();
        res.json(savedUser).status(201);
    } catch(err) {
        res.json(err);
    }

});

//Modify users by id
router.patch('/:userId', auth, async (req, res) => {
    try {
        const users = await User.updateOne(
            { _id: req.params.userId },
            {$set: {friends: req.body.friends, role: req.body.role}},
            function(err, result) {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        })
    }catch(err){
        console.log(err);
    }
});

module.exports = router;