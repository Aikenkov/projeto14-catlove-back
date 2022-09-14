import express from "express";
import { getProducts } from "../controllers/productsController.js";
import verifyAuth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/products", verifyAuth, getProducts);

export default router;
