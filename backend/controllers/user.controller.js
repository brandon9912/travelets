const User = require("../models/user.model");

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
};

module.exports = userController;
