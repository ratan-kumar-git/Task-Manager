const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddelware');
const { getUsers, getUserById } = require('../controllers/userController');

const router = express.Router()

// User managment Route
router.get('/', protect, adminOnly, getUsers)  //get all users(only admin)
router.get('/:id', protect, getUserById)
// router.delete('/:id', protect, adminOnly, deleteUser)  //delete user (only admin)

module.exports = router