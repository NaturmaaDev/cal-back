const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const categoryController = require("./controller/category.controller");
const productController = require("./controller/product.controller");
const userController = require("./controller/user.controller");
const usageController = require("./controller/usage.controller");

const setCurrentUser = require("./middleware/setUserFromToken");
const isLoggedIn = require("./middleware/isLoggedIn");

var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

//parse requests of content -type - application/json
app.use(bodyParser.json());
app.use(setCurrentUser);
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

const db = require("./model/index");
db.Sequelize.sync();

app.get("/category/all", isLoggedIn, categoryController.findAll);
app.get("/product/all", isLoggedIn, productController.findAll);
app.get("/product/cat", productController.getByCategory);
app.get("/product/search", isLoggedIn, productController.getByName);
app.post("/usage/create", isLoggedIn, usageController.addUsage);
app.get("/usage/get", isLoggedIn, usageController.getUsagesByDay);

app.post("/user/register", userController.register);
app.post("/user/login", userController.login);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
