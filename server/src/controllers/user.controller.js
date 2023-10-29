import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../../src/models/User.model.js";
import ProductModel from "../../src/models/Product.model.js";
dotenv.config();

const saltRounds = 10;

// Signup
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
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
    });
    return;
  }

  UserModel.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists" });
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

// Login
export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

  UserModel.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email } = foundUser;
        const payload = { _id, email };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken });
      } else {
        res.status(400).json({ message: "Password is not correct" });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: `Error login : ${error}` })
    );
};

export const verify = (req, res, next) => {
  res.status(200).json(req.payloadAfterVerifyByExpressjwt);
};

export const updateUser = (req, res, next) => {
  const { userId } = req.params;

  const newInfo = {
    username: req.body.username,
    numberPhone: req.body.numberPhone,
    address: req.body.address,
    favouriteProducts: req.body.favouriteProducts,
    ownerProducts: req.body.ownerProducts,
  };

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

export const userDetail = (req, res, next) => {
  const { userId } = req.params;

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

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

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
