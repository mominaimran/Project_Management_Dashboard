import express from "express";
import {
  createAccount,
  loginAccount,
  logoutAccount,
  checkAuth,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authCheck.js";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/login", loginAccount);
router.post("/logout", logoutAccount);
router.get("/checkAuth", protectRoute, checkAuth);

export default router;
