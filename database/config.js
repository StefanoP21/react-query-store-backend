const mongoose = require('mongoose');

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      dbName: process.env.DB_NAME,
    });

    console.log('Connected to the database!');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to the database');
  }
};

module.exports = { connectionDB };
