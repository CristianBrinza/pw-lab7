const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middlewares/auth');

// Other routes ...

router.delete('/:id', auth, deleteTask);

module.exports = router;
