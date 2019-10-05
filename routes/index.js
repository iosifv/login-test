const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("./../util/auth");
const User = require("./../models/User");

router.get("/", (req, res) => res.render("welcome"));
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user
  })
);

router.post("/dashboard", ensureAuthenticated, (req, res) => {
  const { info, email } = req.body;

  User.findOne({ email: email }).then(user => {
    user.info = info;
    user
      .save()
      .then(user => {
        req.flash("success_msg", "Secret info updated");
        res.redirect("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  });
});

module.exports = router;
