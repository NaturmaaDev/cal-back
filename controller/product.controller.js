const db = require("../model/index");
const Product = db.products;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can be placed here!",
    });
    return;
  }

  const product = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Product.create(product)
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        Message:
          err.message || "Some errors will occur when creating a tutorial",
      });
    });
};

exports.findAll = (req, res) => {
  Product.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error have occure when retrieving the tutorials",
      });
    });
};
