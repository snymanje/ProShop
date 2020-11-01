import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import "colors";
import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Products from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Products.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;

    const sampleproducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Products.insertMany(sampleproducts);

    console.log("Data Imported!".green.inverse);

    process.exit(0);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Products.deleteMany();

    console.log("Data Imported!".red.inverse);

    process.exit(0);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
