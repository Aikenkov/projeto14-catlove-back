import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/status", (req, res) => {
    return res.send("foiiiiiiiii");
});

server.listen(5000, () => {
    console.log(`Listening on port: ${process.env.PORT_API}`);
});
