const dbConfig = require("../db.config.js");

const sequelize = require("sequelize");
const Sequelize = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.diaglect,
  operationsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.categories = require("./category")(sequelize, Sequelize);

db.products = require("./product")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.usages = require("./usage")(sequelize, Sequelize);
db.summaries = require("./summary")(sequelize, Sequelize);

module.exports = db;
