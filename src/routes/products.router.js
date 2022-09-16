import express from "express";
import verifyAuth from "../middlewares/auth.middleware.js";
import verifyCheckout from "../middlewares/checkout.middleware.js";
import {
  checkout,
  getCart,
  getProducts,
  insertOnCart,
  deleteOnCart,
} from "../controllers/productsController.js";

import { produtos } from "../controllers/authController.js";

const router = express.Router();

router.get("/products", verifyAuth, getProducts);
router.post("/cart", verifyAuth, insertOnCart);
router.get("/cart", verifyAuth, getCart);
router.delete("/cart", verifyAuth, deleteOnCart);
router.post("/produtos", produtos);
router.post("/checkout", verifyAuth, verifyCheckout, checkout);

export default router;
