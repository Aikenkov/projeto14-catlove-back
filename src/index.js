import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/status", (req, res) => {
    return res.send("foiiiiiiiii");
});

server.use(userRouter);

server.listen(5000, () => {
    console.log(`Listening on port: ${process.env.PORT_API}`);
});
