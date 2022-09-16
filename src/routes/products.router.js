import express from "express";
import verifyAuth from "../middlewares/auth.middleware.js";
import {
    checkout,
    getCart,
    getProducts,
    insertOnCart,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/products", verifyAuth, getProducts);
router.post("/cart", verifyAuth, insertOnCart);
router.get("/cart", verifyAuth, getCart);
router.post("/checkout", verifyAuth, checkout);

export default router;
