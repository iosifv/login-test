module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log("req.isAuthenticated() = ", req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    console.log("Forbidden...");
  }
};
