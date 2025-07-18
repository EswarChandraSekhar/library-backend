const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST create new todo
router.post('/', async (req, res) => {
  try {
    const { id, title, category, taskCompleted } = req.body;
    const newTodo = new Todo({ id, title, category, taskCompleted });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create todo' });
  }
});

// DELETE a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const deletedTodo = await Todo.findOneAndDelete({id});
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
