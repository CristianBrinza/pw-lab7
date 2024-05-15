const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const tasks = await Task.find({ user: req.user.id })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndRemove(id);
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
