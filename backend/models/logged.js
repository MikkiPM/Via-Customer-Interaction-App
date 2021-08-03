const mongoose = require('mongoose');

const loggedSchema = new mongoose.Schema({
    name: {
        type: String
    },
    users: {
        type: []
    }
});

module.exports = mongoose.model('Logged', loggedSchema, 'logged');