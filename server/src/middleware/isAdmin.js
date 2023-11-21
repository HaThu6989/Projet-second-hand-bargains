import User from "../models/User.model.js";
import mongoose from "mongoose";

const isAdmin = (req, res, next) => {
  const { adminId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(adminId).then((admin) => {
    if (admin.email === "admin@gmail.com") {
      next();
    } else {
      res.status(401).json({ message: "You aren't the admin" });
    }
  });
};

export default isAdmin;
