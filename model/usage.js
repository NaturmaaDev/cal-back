module.exports = (Sequelize, sequelize) => {
  const Usage = sequelize.define("usage", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    count: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.DATE,
    },
  });

  return Usage;
};
