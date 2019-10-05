const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const util = require("../util/util");
const passport = require("passport");
const { forwardAuthenticated } = require("../util/auth");

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

router.post("/register", (req, res) => {
  const { name, email, password, confirm } = req.body;
  util.emptyErrors();

  if (!name || !email || !password || !confirm) {
    util.pushError("All fields are required");
  }

  if (password != confirm) {
    util.pushError("Passwords do not match");
  }

  if (password.length < 8) {
    util.pushError("Password lenght needs to be at least 8 characters");
  }

  if (util.getErrors().length > 0) {
    res.render("register", {
      name,
      email,
      password,
      confirm,
      errors: util.getErrors()
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        util.pushError("Email is already registered");
        res.render("register", {
          name,
          email,
          password,
          confirm,
          errors: util.getErrors()
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            // Overwriting the password with the hashed password
            newUser.password = hash;
            console.log("Saving new user...");
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
              });
          })
        );
      }
    });
  }
  res.send("Passed..");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
