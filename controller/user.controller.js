const db = require("../model/index");

const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");

const User = db.users;

exports.register = (req, res) => {
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

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  User.create(user)
    .then((data) => {
      console.log("data", data);
      res.json({ data });
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "Some errors will occur when creating user",
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
      let token = jwt.sign({ id: data.id, email: data.email }, "secret", {
        expiresIn: "24h",
      });
      const dd = { token, id: data.id };
      res.json({ ...dd });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error have occurent when try to login.",
      });
    });
};
