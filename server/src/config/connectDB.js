require('dotenv').config();
const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log('DB connection SUCCESSFUL');
    });
  } catch (error) {
    console.log('DB connection FAILED');
    process.exit(1);
  }
};

module.exports = connect;
