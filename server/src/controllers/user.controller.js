import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../../src/models/User.model.js";
import ProductModel from "../../src/models/Product.model.js";
import mongoose from "mongoose";
dotenv.config();

const saltRounds = 10;

/* Signup */
export const signup = (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address" });
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit comporter au moins 6 caractères et inclure au moins un chiffre, une lettre minuscule et une lettre majuscule",
    });
    return;
  }

  UserModel.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Utilisateur déjà existant" });
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return UserModel.create({
        email,
        password: hashedPassword,
        username: req.body.username,
        numberPhone: req.body.numberPhone,
        address: req.body.address,
      });
    })
    .then((createdUser) => {
      const { email, password, username, numberPhone, address } = createdUser;
      const user = { email, password, username, numberPhone, address };
      res.status(200).json({ user: user });
    })
    .catch((error) => {
      console.log("Error creating new user... ", error);
      res.status(500).json({ message: "Error creating new user" });
    });
};

/* Login */
export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  UserModel.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "Utilisateur non trouvé" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, username } = foundUser;
        const payload = { _id, email, username };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        if (email === "admin@gmail.com") {
          res.status(200).json({ authToken: authToken, isAdmin: true });
        } else {
          res.status(200).json({ authToken: authToken, isAdmin: false });
        }
      } else {
        res.status(400).json({ message: "Le mot de passe n'est pas correct" });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: `Error login : ${error}` })
    );
};

/* Verify auth */
export const verify = (req, res, next) => {
  res.status(200).json(req.payloadAfterVerifyByExpressjwt);
};

/* Check is owner of page */
export const checkOwnerPage = (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  UserModel.findById(userId)
    .then((userFromDB) => {
      const inputString = req.payloadAfterVerifyByExpressjwt._id;
      const objectId = new mongoose.Types.ObjectId(inputString);

      if (userFromDB._id.equals(objectId)) {
        res.json({ isOwnerPage: true, message: "You are the owner" });
      } else {
        res.json({ isOwnerPage: false, message: "You aren't the owner" });
      }
    })
    .catch((error) => console.log("Error find user by id", error));
};

/* Update user */
export const updateUser = (req, res, next) => {
  const { userId } = req.params;

  const newInfo = {
    username: req.body.username,
    numberPhone: req.body.numberPhone,
    address: req.body.address,
    favouriteProducts: req.body.favouriteProducts,
    ownerProducts: req.body.ownerProducts,
  };

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  UserModel.findByIdAndUpdate(userId, newInfo, {
    new: true,
  })
    .populate("favouriteProducts")
    .populate("ownerProducts")
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.log("error updating user in DB", err);
      next(err);
    });
};

/* Get user detail */
export const getUserDetail = (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  UserModel.findById(userId)
    .populate("favouriteProducts")
    .populate("ownerProducts")
    .then((userDetail) => {
      res.status(200).json(userDetail);
    })
    .catch((err) => {
      console.log("error getting one user in DB", err);
      next(err);
    });
};

/* Get all users */
export const getAllUsers = (req, res, next) => {
  UserModel.find()
    .then((usersArray) => {
      res.status(200).json(usersArray);
    })
    .catch((error) => {
      console.log(
        "There was an error getting the user list from the database:",
        error
      );
      next(error);
    });
};

/* Delete user */
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const userToDelete = await UserModel.findById(userId);

    await ProductModel.deleteMany({
      _id: { $in: userToDelete.ownerProducts },
    });

    await UserModel.findByIdAndDelete(userId);

    res.status(200).json(userId);
  } catch (error) {
    console.log("There was an error of deleting the user", error);
    res.status(500).json({
      message: "error of deleting the user",
      error: error,
    });
  }
};
