const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const categoryController = require("./controller/category.controller");
const productController = require("./controller/product.controller");
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

//parse requests of content -type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

const db = require("./model/index");
db.Sequelize.sync();

app.get("/category/all", categoryController.findAll);
app.get("/product/all", productController.findAll);
app.get("/product/cat", productController.getByCategory);
app.get("/product/search", productController.getByName);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
