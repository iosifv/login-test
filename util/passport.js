const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./../models/User");
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      console.log("Executing local strategy...");
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            console.log("Provided email does not exist");
            return done(null, false, {
              message: "Provided email does not exist"
            });
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              console.log("Match!");
              return done(null, user);
            } else {
              console.log("Incorrect password.");
              return done(null, false, {
                message: "Incorrect password"
              });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
