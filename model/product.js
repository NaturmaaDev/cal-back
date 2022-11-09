module.exports = (Sequelize, sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    ammount: {
      type: Sequelize.INTEGER,
    },
    calorie: {
      type: Sequelize.INTEGER,
    },
    catId: {
      type: Sequelize.INTEGER,
    },
    info: {
      type: Sequelize.STRING,
    },
    unitId: {
      type: Sequelize.INTEGER,
    },
  });
  return Product;
};
