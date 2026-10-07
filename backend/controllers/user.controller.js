const User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { signToken, TOKEN_EXPIRE } = require("../utils/token");

const authResponse = (user) => ({
  access_token: signToken(user._id),
  access_expired: TOKEN_EXPIRE,
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
  },
});

const userController = {
  // user register
  userRegister: async (req, res) => {
    try {
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

      // check if user already exists
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // create new user
      const user = new User({ username, password, email });
      const newUser = await user.save();
      res.status(200).json({
        message: "User created successfully",
        status: "success",
        data: authResponse(newUser),
      });
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
      const user = await User.findOne({ email: email }).select("+password");
      const isMatch = user && (await bcrypt.compare(password, user.password));
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid email or password", status: "error" });
      }
      await User.updateOne({ _id: user._id }, { login_at: Date.now() });
      res.status(200).json({
        message: "User logged in successfully",
        status: "success",
        data: authResponse(user),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, status: "error" });
    }
  },
  // get user profile
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
