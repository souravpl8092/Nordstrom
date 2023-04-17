const express = require("express");
const { userModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  let query = req.query;
  try {
    const users = await userModel.find(query);
    res.status(200).send(users);
  } catch (error) {
    console.log(err);
    res.status(500).send({ err: "Something went wrong" });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const isExist = await userModel.findOne({ email });
        if (isExist) {
          return res.status(400).send({
            message: "User already exist Please login",
          });
        }
        const user = new userModel({
          name,
          email,
          password: secure_password,
        });
        await user.save();
        return res.status(201).send({
          message: "User created successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });

    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          console.log(user[0].name);
          return res.status(200).send({
            message: "Login Successful",
            username: user[0].name,
            token,
          });
        } else {
          return res.status(400).send({
            message: "Invalid Credentials",
          });
        }
      });
    } else {
      return res.status(400).send({
        message: "User not found Please signup",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = {
  userRouter,
};
