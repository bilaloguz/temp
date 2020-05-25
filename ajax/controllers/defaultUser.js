const User = require('../models/User'),
    bcrypt = require('bcrypt');


module.exports.createDefaultUser = () => {
    User.findOne({
        name: "admin"
    }).then(user => {
        if (!user) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash("123456", salt, function (err, hash) {
                    if (err) throw err;
                    const newUser = new User({
                        name: "admin",
                        password: hash,
                        role: "admin"
                    });
                    newUser
                        .save()
                        .then(() => {
                            console.log('user created');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    }).catch(err => console.log(err));
}