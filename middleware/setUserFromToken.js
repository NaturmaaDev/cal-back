const jwt = require("jsonwebtoken");
const db = require("../model/index");
const User = db.users;

const getUserFromToken = async (token) => {
  try {
    token = token.substring(7);
    const verify = jwt.verify(token, "secret");
    const user = await User.findOne({ where: { id: verify.id } });
    return user;
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return false;
  }
};
module.exports = function setCurrentUser(req, res, next) {
  // grab authentication token from the req header
  let token = req.header("Authorization");
  if (token == undefined) {
    next();
  } else {
    // looking up the user as per the token
    getUserFromToken(token).then((user) => {
      // appending the user object with the requested object
      req.user = user;
      // calling the next middleware in the stack
      next();
    });
  }
};
