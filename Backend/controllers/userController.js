const Task = require("../models/Task");
const User = require("../models/User");

// @desc   Get all user (only admin)
// @route  GET /api/users/
// @access Private(admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");
    
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });
        
        return {
          ...user._doc, //including all existing users data
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    res.status(200).json(usersWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get user by id
// @route  GET /api/users/:id
// @access Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete user by id (only admin)
// @route  Delete /api/users/:id
// @access Private(admin)
// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password")
//     if (!user) {
//         return res.status(404).json({message: "User not found"})
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

module.exports = { getUsers, getUserById};
