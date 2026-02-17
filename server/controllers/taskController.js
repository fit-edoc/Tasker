const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const task = await Task.create({
        user: req.user.id,
        title,
        description,
        status,
    });

    res.status(200).json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    const user = req.user;

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(400);
        throw new Error('Task not found');
    }

    const user = req.user;

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
