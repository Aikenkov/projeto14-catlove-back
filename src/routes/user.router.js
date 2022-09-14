import express from "express";
import { signUp } from "../controllers/authController.js";
import verifySignUp from "../middlewares/validationSignUp.middleware.js";

const router = express.Router();

router.post("/signUp", verifySignUp, signUp);

export default router;
