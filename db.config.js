module.exports = {
  HOST: "caldb.ceqkqisjx5xt.ap-northeast-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "Naturmaa21;",
  DB: "cal",
  diaglect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
