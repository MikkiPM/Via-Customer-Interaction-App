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
    
    //res.send({usid: user._id, msg: "added successfully", users: loggedUsers.users});
    res.render("index", {users: loggedUsers});
	
	

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

}


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////MAIN ALGO FUNCTIONS////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
function get_specific_grades(age1, age2, city1, city2, career1, career2, hobbies1, hobbies2) {
    let career_list = [];
    let hobbies_dict = {};
    if (Math.abs(age1 - age2) <= 5)
        age = 1;
    else
        age = 0;
    if (city1 == city2)
        city_same = 1;
    else
        city_same = 0;
    let career = 0;
    let hobbies = 0;
    for (key in career1) {
        if (career1[key] == career2[key]) {
            career += 1;
            if (career1[key] == true)
                career_list.push(key);
		}
	}
    career = career/career1.length;
    let hobbies_inside_len = 0;
    for (key in hobbies1) {
        let temp_hobbies_list = [];
        for (inside_key in hobbies1[key]) {
            if (hobbies1[key][inside_key] == hobbies2[key][inside_key]) {
                hobbies += 1;
                if (hobbies1[key][inside_key] == true)
                    temp_hobbies_list.push(inside_key);
			}
		}
        hobbies_dict[key] = temp_hobbies_list;
        hobbies_inside_len += hobbies1[key].length;
	}
    hobbies = hobbies/hobbies_inside_len;
    return [age, city_same, career, hobbies, career_list, hobbies_dict];
}

function formula(age, city_same, career, hobbies){
	let DICT_WEIGHT = {'age': 0.1, 'city': 0.2, 'career': 0.35, 'hobbies': 0.35};
    return DICT_WEIGHT['city']*city_same + DICT_WEIGHT['career']*career + DICT_WEIGHT['hobbies']*hobbies + DICT_WEIGHT['age']*age;
}

function same_lang(language1, language2) {
    for (each in language1)
        if (language2.includes(each))
            return true;
    return false;
}

function mainAlgo() {
    let interaction = [];
	
	for (user in users){
		for (partner in users){
			if (user.username == partner.username)
				continue;
			if (same_lang(user.language, partner.language)) {
			details = get_specific_grades(user.age, partner.age, user.address['city'], partner.address['city'], user.career, partner.career, user.hobbies, partner.hobbies);
			grade = formula(details[0], details[1], details[2], details[3]);
			if (grade > 0.25) {
				let temp_dict = {};
				temp_dict[user.username] = partner.username;
				temp_dict['career'] = details[4];
				temp_dict['hobbies'] = details[5];
				interaction.push(temp_dict);
			}
		}
	}
	return interaction;

}
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////END OF ALGO////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////





module.exports = router;

