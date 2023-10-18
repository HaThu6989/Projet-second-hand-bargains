import express from "express";
import {
  signup,
  login,
  verify,
  updateUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", isAuthenticated, verify);
// router.get("/userId/edit", isAuthenticated, updateUser);
router.post("/:userId/edit", updateUser);

export default router;
