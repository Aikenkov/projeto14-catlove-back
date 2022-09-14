import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import verifySignUp from "../middlewares/validationSignUp.middleware.js";
import verifySingIn from "../middlewares/validationSignIn.middleware.js";
const router = express.Router();

router.post("/signUp", verifySignUp, signUp);
router.post("/signIn", verifySingIn, signIn);

export default router;
