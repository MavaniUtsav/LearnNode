const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

const connectPassport = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: '864057795098-3sv2et2hop012vovs6c4a84r7kkidg5v.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:3000/v1/users/google/callback"
        },
            function (accessToken, refreshToken, profile, cb) {
                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectPassport