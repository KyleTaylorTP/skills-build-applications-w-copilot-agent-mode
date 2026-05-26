import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
    });
    console.log('✓ Successfully connected to MongoDB');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ Successfully disconnected from MongoDB');
  } catch (error) {
    console.error('✗ MongoDB disconnection error:', error);
    process.exit(1);
  }
};

export const getDatabaseUri = (): string => {
  return MONGODB_URI;
};

export const getDatabaseName = (): string => {
  return 'octofit_db';
};

export default {
  uri: MONGODB_URI,
  name: 'octofit_db',
  connect: connectDatabase,
  disconnect: disconnectDatabase,
};
