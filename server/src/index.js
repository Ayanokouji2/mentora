import "dotenv/config";

import app from './app.js';
const PORT = process.env.PORT || 5000


const server = app.listen(PORT,()=>{
    console.log(`Server is running in PORT: ${PORT}`);
});


server.on("error", (err) =>{
    console.error(`Failed to start the server : ${err.message}`);
    process.exit(1);
})