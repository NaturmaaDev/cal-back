const db = require("../model/index");

const jwt = require("jsonwebtoken");
const { calculate } = require("./summary.controller");
const product = db.products;
const summary = db.summaries;
const { Op } = require("sequelize");
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
      console.log("total", total);
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
  const startDate = new Date(req.body.date).toISOString().split("T")[0];

  Usage.findAll({
    where: {
      date: {
        [Op.lt]: new Date(
          new Date(startDate).getTime() + 60 * 60 * 24 * 1000 - 1
        ),
        [Op.gt]: new Date(startDate),
      },
    },
  })
    .then(async (data) => {
      data = JSON.parse(JSON.stringify(data));
      let summar = await summary.findOne({
        where: {
          date: startDate,
        },
      });
      let result = [];
      await Promise.all(
        data.map(async (dat) => {
          let pro = await product.findByPk(dat.productId);
          pro = JSON.parse(JSON.stringify(pro));
          result.push({ ...dat, product: pro });
        })
      );

      res.json({ data: { result, summar }, error: false, message: "" });
    })
    .catch((err) => {
      res.status(500).send({
        data: null,
        error: true,
        message:
          err.message || "Some error have occurent when try to get usages.",
      });
    });
};
