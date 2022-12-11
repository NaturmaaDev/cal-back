const db = require("../model/index");

const jwt = require("jsonwebtoken");
const { calculate } = require("./summary.controller");
//const bcrypt = require("bcryptjs");

const Usage = db.usages;

exports.addUsage = (req, res) => {
  if (!req.body.count) {
    res.status(400).send({
      message: "Count can be placed here!",
    });
    return;
  }

  if (!req.body.productId.toString().length) {
    res.status(400).send({
      message: "Product can be placed here!",
    });
    return;
  }

  const usage = {
    count: req.body.count,
    productId: req.body.productId,
    userId: req.user.id,
    date: Date.now(),
  };
  //console.log("usage ", usage);
  //

  Usage.create(usage)
    .then(async (data) => {
      // console.log("data", data);
      let total = await calculate(req.user.id);
      res.json({ data: total, error: false, message: "" });
    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: err.message || "Some errors will occur when creating usage",
      });
    });
};

exports.getUsagesByDay = (req, res) => {
  Usage.findAll({})
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error have occurent when try to get usages.",
      });
    });
};
