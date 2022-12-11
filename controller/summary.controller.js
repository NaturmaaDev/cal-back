const db = require("../model/index");

const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
//const bcrypt = require("bcryptjs");
const Usage = db.usages;
const Summary = db.summaries;
const Product = db.products;

exports.calculate = async (userId) => {
  try {
    //   const date = Date.toString();
    const startDate = new Date().toISOString().split("T")[0];

    let re = await Usage.findAll({
      includes: ["date", "userId", "productId", "count"],
      where: {
        userId: userId,
        date: {
          [Op.lt]: new Date(
            new Date(startDate).getTime() + 60 * 60 * 24 * 1000 - 1
          ),
          [Op.gt]: new Date(startDate),
        },
      },
      raw: false,
    });
    let todayEnergy = 0;
    re = JSON.parse(JSON.stringify(re));
    await Promise.all(
      re.map(async (usage) => {
        let productItem = await Product.findByPk(usage.productId);
        productItem = JSON.parse(JSON.stringify(productItem));
        todayEnergy += productItem.calorie * usage.count;
      })
    );
    const [summary, created] = await Summary.findOrCreate({
      where: { userId, date: new Date(startDate) },
      defaults: {
        userId,
        date: new Date(startDate),
        summary: todayEnergy,
      },
    });
    if (created) {
    } else {
      await Summary.update(
        { summary: todayEnergy },
        {
          where: {
            userId,
            date: new Date(startDate),
          },
        }
      );
    }
    console.log("today energy", todayEnergy);

    return todayEnergy;
  } catch (err) {
    return 0;
  }
};
