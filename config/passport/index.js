const users = require('../../models/User.model');

module.exports = (passport) => {
    passport.use(users.User.createStrategy());  

    passport.serializeUser((user, done) => {      
        done(null, user);
    });

    passport.deserializeUser((id, done) => {      
        users.User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    return passport;
};


