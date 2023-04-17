const express = require("express");
const { ProductModel } = require("../Models/product.model");

const productRouter = express.Router();

productRouter.use(express.json());

productRouter.get("/", async (req, res) => {
  let query = {};
  const { category, orderBy } = req.query;
  if (category) {
    query.category = category;
  }
  try {
    let products;
    if (orderBy === "") {
      products = await ProductModel.find(query);
    } else {
      products = await ProductModel.find(query).sort({ price: orderBy });
    }

    return res.status(200).send({
      products,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

productRouter.post("/many", async (req, res) => {
  const payload = req.body;
  try {
    const newProduct = await ProductModel.insertMany(payload);
    res.status(201).send(newProduct);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

module.exports = {
  productRouter,
};
