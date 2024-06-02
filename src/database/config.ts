import mongoose from 'mongoose';

export const connectionDB = async () => {
  try {
    const dbCnn = process.env.DB_CONNECTION_STRING;
    const dbName = process.env.DB_NAME;

    if (!dbCnn || !dbName) throw new Error('Missing environment variables');

    await mongoose.connect(dbCnn, { dbName: dbName });

    console.log('Connected to the database!');
  } catch (error) {
    console.log(error);
    throw new Error('Error connecting to the database');
  }
};
