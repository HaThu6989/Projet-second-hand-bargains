import express from "express";
import {
  signup,
  login,
  verify,
  updateUser,
  getUserDetail,
  deleteUser,
  checkOwnerPage,
  getAllUsers,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", isAuthenticated, verify);
router.get("/:userId/checkOwnerPage", isAuthenticated, checkOwnerPage);
router.put("/:userId/update", isAuthenticated, updateUser);
router.get("/:userId", isAuthenticated, getUserDetail);
router.get("/:adminId/allUsers", isAuthenticated, isAdmin, getAllUsers);
router.delete(
  "/:adminId/deleteOneUser/:userId",
  isAuthenticated,
  isAdmin,
  deleteUser
);

export default router;
