const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const userSchema = require("../assets/schemas/userSchema");
require("../auth/passport-setup");

passport.serializeUser((user, done) => {
  userSchema.where({ gid: user.id }).exec((err, retnUser) => {
    if (err) {
      done(err, null);
    } else {
      if (retnUser.length === 0) {
        try {
          const newUser = new userSchema({
            gid: user.id,
            privilege: 0,
            userData: user,
          });
          newUser.save();
          done(null, newUser);
        } catch (error) {
          done(err, null);
        }
      } else {
        done(null, retnUser[0]);
      }
    }
  });
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(err, user);
});

passport.use(
  new googleStrategy(
    {
      clientID:
        "948228655244-h1s2vgluggachrcs5it6me626r59c69m.apps.googleusercontent.com",
      clientSecret: "UBkkGaF2P03Q6-NQLACuXH2P",
      callbackURL: "http://localhost:8090/auth/google/callback",
    },
    (accessToken, refreskToken, profile, done) => {
      //verification
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);
