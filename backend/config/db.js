





import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('samstore', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

















// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDb = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI;
//     console.log("MONGO_URI:", mongoURI); // Debug line

//     if (!mongoURI) {
//       throw new Error("MONGO_URI is not defined in the environment variables.");
//     }

//     const conn = await mongoose.connect(mongoURI);  // Mongoose will handle the options

//     console.log(`MongoDB connected: ${conn.connection.host}`.bold.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.bold.red);
//     process.exit(1);
//   }
// };

// export default connectDb;
