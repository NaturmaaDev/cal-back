module.exports = (Sequelize, sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      //defaultValue: Sequelize.literal("gen_random_uuid()"),
      primaryKey: true,
    },
    email: {
      type: Sequelize.TEXT,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.TEXT,
    },
  });

  return User;
};
