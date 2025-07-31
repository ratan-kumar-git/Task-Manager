const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddelware');
const { exportUsersReport, exportTasksReport } = require('../controllers/reportController');
const router = express.Router()

// export rotes
router.get('/export/tasks', protect, adminOnly, exportTasksReport)
router.get('/export/users', protect, adminOnly, exportUsersReport)

module.exports = router