const User = require("../models/user.model");
const validator = require("validator");

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
      const result = await user.save();
      res
        .status(200)
        .json({ message: "User created successfully", data: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
