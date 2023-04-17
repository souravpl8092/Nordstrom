const express = require("express");
const { CartModel } = require("../Models/cart.model");
const cartRouter = express.Router();

/* const middleware = async (req, res, next) => {
  const { token } = req.headers;
  try {
    if (!token) {
      return res.status(400).send({
        message: "Token not found",
      });
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    console.log("userId: ", userId);
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

cartRouter.use(middleware); */

cartRouter.get("/", async (req, res) => {
  //const { token } = req.headers;
  try {
    const cartProducts = await CartModel.find({}).populate("productId");
    return res.status(200).send({
      cartProducts,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

cartRouter.post("/", async (req, res) => {
  //const { token } = req.headers;
  const { productId, quantity } = req.body;
  try {
    const isExist = await CartModel.findOne({ productId });

    if (isExist) {
      return res.status(500).send({
        message: "Product already exist in cart",
      });
    }

    await CartModel.create({
      productId,
      quantity,
    });

    const products = await CartModel.find({ productId }).populate("productId");

    return res.status(201).send({
      message: "Product added to cart",
      products: products,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

cartRouter.put("/", async (req, res) => {
  try {
    await CartModel.deleteMany({});

    return res.status(200).send({
      message: "Order placed successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

cartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CartModel.findByIdAndDelete(id);

    return res.status(200).send({
      message: "Product deleted from cart",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = { cartRouter };
