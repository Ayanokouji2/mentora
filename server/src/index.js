import "dotenv/config";
import connectDb from "./utils/connection.js";

import app from "./app.js";
const PORT = process.env.PORT || 5000;

connectDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running in PORT: ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(`Failed to start the server : ${err.message}`);
		process.exit(1);
	});
