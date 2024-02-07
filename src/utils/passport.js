const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../model/user.model');
const { accessRefreshToken } = require('../controller/users.controller');

const connectPassport = async () => {
    try {
        await passport.use(new GoogleStrategy({
            clientID: '864057795098-3sv2et2hop012vovs6c4a84r7kkidg5v.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:3000/v1/users/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                const user = await User.findOne({ googleId: profile.id })

                if (!user) {
                    try {
                        const user = await User.create({
                            googleId: profile.id,
                            name: profile.displayName,
                            role: 'user'
                        })

                        const { accessToken, refreshToken } = await accessRefreshToken(user.id)

                        console.log(refreshToken);

                        user.refreshToken = refreshToken
                        user.save()

                        return cb(null, user)
                    } catch (error) {
                        return cb(error.message, null)
                    }
                }

                return cb(null, user)
            }
        ));

        passport.serializeUser(function (user, done) {
            console.log('serrrrr', user.id, user);
            done(null, user.id)
        });

        passport.deserializeUser(async function (id, done) {
            // User.find({id: user._id});
                console.log('deserializeUser', id);
                const user = await User.findById(id);
                console.log(user);
                done(null, user); // Pass the user object to the callback
        });
    } catch (error) {
        console.log(error.message);
    }
}

const connectFacebook = async () => {
    try {
        await passport.use(new FacebookStrategy({
            clientID: '754709059540345',
            clientSecret: 'e51c06feb65d8234355e5abfc87cb953',
            callbackURL: "http://localhost:3000/v1/users/facebook/callback"
        },
            function (accessToken, refreshToken, profile, cb) {
                // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                //   return cb(err, user);
                // });
            }
        ));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectPassport,
    connectFacebook
}