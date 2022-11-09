module.exports = (Sequelize, sequelize) => {
  const Category = sequelize.define("category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Category;
};
