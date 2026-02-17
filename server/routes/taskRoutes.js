const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(asyncHandler(protect), asyncHandler(getTasks)).post(asyncHandler(protect), asyncHandler(createTask));
router.route('/:id').put(asyncHandler(protect), asyncHandler(updateTask)).delete(asyncHandler(protect), asyncHandler(deleteTask));

module.exports = router;
