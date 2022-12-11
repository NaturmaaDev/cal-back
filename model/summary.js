module.exports = (Sequelize, sequelize) => {
  const Summary = sequelize.define("summary", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    summary: {
      type: Sequelize.INTEGER,
    },
  });

  return Summary;
};
