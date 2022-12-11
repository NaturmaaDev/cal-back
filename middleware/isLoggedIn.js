module.exports = function isLoggedIn(req, res, next) {
  if (req.user) {
    // user will be authenticated
    next();
  } else {
    // return unauthorized user
    res.send(401, "Unauthorized");
  }
};
