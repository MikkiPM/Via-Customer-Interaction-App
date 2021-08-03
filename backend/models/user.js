const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        first:{
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
        alias: {
            type: String
        }
    },
    language: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    age: {
        type: Number
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interests: {
        type: []
    }
});

module.exports = mongoose.model('User', userSchema, 'users');