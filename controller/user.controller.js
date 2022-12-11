const db = require("../model/index");

const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");

const User = db.users;

exports.register = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can be placed here!",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "Name can be placed here!",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Password be placed here!",
    });
    return;
  }
  const name = req.body.name.toString().trim().toLowerCase();
  const email = req.body.email.toString().trim().toLowerCase();
  const password = req.body.password.toString().trim().toLowerCase();
  const user = {
    name: name,
    email: email,
    password: password,
  };
  const userFound = await User.findOne({
    where: { email },
  });
  if (userFound) {
    return res.json({
      data: null,
      error: true,
      message: "Email already exists.",
    });
  }
  User.create(user)
    .then((data) => {
      res.json({ data: null, error: false, message: "Success" });
    })
    .catch((err) => {
      console.log("jdfsfsda", err);
      res.status(500).json({
        error: true,
        data: null,
        message: err.message || "Some errors will occur when creating user",
      });
    });
};

exports.login = (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: "Email be placed here!",
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Password be placed here!",
    });
    return;
  }

  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then((data) => {
      if (!data) {
        return res.json({
          data: null,
          message: "email or password does not match",
          error: true,
        });
      }
      let token = jwt.sign({ id: data.id, email: data.email }, "secret", {
        expiresIn: "24h",
      });
      const dd = { token, id: data.id };
      res.json({ data: dd, error: false, message: "logged in successfully." });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error have occurent when try to login.",
        error: true,
        data: null,
      });
    });
};
