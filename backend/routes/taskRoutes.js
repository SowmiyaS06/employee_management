const express = require('express');
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getEmployees).post(protect, createEmployee);
router.route('/:id').put(protect, updateEmployee).delete(protect, deleteEmployee);

module.exports = router;
