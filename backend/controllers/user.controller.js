const User = require("../models/user.model");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController = {
  // get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      console.log(users);
      res.status(200).json({ users: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // user register
  userRegister: async (req, res) => {
    try {
      console.log(req.body);
      var { username } = req.body;
      const { password, email } = req.body;

      // check if username or password or email is empty
      if (!username || !password || !email) {
        return res
          .status(400)
          .json({ message: "Please fill in all required fields" });
      }

      // check if email is valid
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
      }

      // escape username
      username = validator.escape(username);

      // check if username already exists
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // create new user
      const user = new User({ username, password, email });
      const newUser = await user.save();
      const data = {
        access_token: jwt.sign(
          { userId: newUser._id },
          process.env.TOKEN_SECRET
        ),
        access_expired: 3600,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      };
      res
        .status(200)
        .json({ message: "User created successfully", data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  // user login
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please fill in all required fields" });
      }
      const userExists = await User.find({ email: email });
      if (!userExists) {
        return res.status(400).json({ message: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, userExists[0].password);
      // TODO - if password is incorrect, return error
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid credentials: Incorrect Password" });
      }
      await User.updateOne(
        { _id: userExists[0]._id },
        { login_at: Date.now() }
      );
      const data = {
        access_token: jwt.sign(
          { userId: userExists[0]._id },
          process.env.TOKEN_SECRET
        ),
        access_expired: process.env.TOKEN_EXPIRE,
        user: {
          id: userExists[0]._id,
          username: userExists[0].username,
          email: userExists[0].email,
        },
      };
      res.status(200).json({
        message: "User logged in successfully",
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, status: "error" });
    }
  },
  // get user profile
  getUserProfile: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user_id = decoded.userId;

      const user = await User.findById({ _id: user_id });
      res.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
