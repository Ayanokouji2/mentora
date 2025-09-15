import mongoose from "mongoose";
import {MONGO_URI} from '../constant/config.js'

const connectDb = async () => {
	await mongoose
		.connect(MONGO_URI)
		.then(() => {
			console.log("Connection with database established....!");
		})
		.catch((err) => {
			console.error("❌ MongoDB connection failed:", err.message);
			process.exit(1);
		});
};

export default connectDb;
