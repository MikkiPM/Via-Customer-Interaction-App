const router = require('express').Router();
const User = require('../models/user');
const Logged = require('../models/logged');
const mongoose = require('mongoose');

// REGISTRATION

// LOGIN

router.get('/login', (req, res) => {
    res.send('login page');
});

router.post('/login', async (req, res) => {

    console.log(req.body);
    
     // CHECKS FOR EXISTING USER
     const user = await User.findOne({username: req.body.username});
     if (!user) { return res.status(400).send('ERROR: wrong email'); }

     // PASSWORD CHECKING
     if(req.body.password != user.password) { return res.status(400).send('ERROR: wrong password'); }

    const loggedUsers = await Logged.findOne({name: "logged users"});
    if(!loggedUsers) { return res.status(500).send('Unable to reach logged file.'); }

    // TODO: check if the user is already logged.
    loggedUsers.users.push(user);
    loggedUsers.save();
    
    res.send({usid: user._id, msg: "added successfully", users: loggedUsers.users});
    //res.render("index", {users: loggedUsers});

});

async function getMatches() {
    const usersLogged = await Logged.findOne({name: "logged users"});
    if(!usersLogged) return [];

    const usersIds = usersLogged.users;
    let users = [];
    for (const user of usersIds) {
        let u = await User.findById(user);
        if(u) users.push(u);
    }
    WEIGHT = {'age': 0.1, 'city': 0.2, 'career': 0.35, 'hobbies': 0.35};

}

module.exports = router;

