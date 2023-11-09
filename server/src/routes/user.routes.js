import express from "express";
import {
  signup,
  login,
  verify,
  updateUser,
  userDetail,
  deleteUser,
  checkOwnerPage,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", isAuthenticated, verify);
router.get("/:userId/checkOwnerPage", isAuthenticated, checkOwnerPage);
router.put("/:userId/update", isAuthenticated, updateUser);
router.get("/:userId", isAuthenticated, userDetail);
router.delete("/:userId", deleteUser); // admin

export default router;