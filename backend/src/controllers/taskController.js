const Task = require('../models/Task');

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the task belongs to the user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await Task.findByIdAndRemove(id);
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
