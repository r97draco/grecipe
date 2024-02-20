require('dotenv').config();
const mongoose = require('mongoose');
// const logger = require("./logger");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      // logger.info("Connected to MongoDB");
      console.log('DB connection SUCCESSFUL');
    });
  } catch (error) {
    // logger.error('Could not connect to db');
    console.log('DB connection FAILED');
    process.exit(1);
  }
};

module.exports = connect;
