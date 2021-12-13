const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true,
        unique: true
    },
    friends: [{
        type: String
    }],
    inexistantFriends: [{
        type: String
    }],
    role:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);