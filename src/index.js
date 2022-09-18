import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import productsRouter from "./routes/products.router.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(productsRouter);
server.use(userRouter);

server.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});
