const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: {type: String,required: true,increment: 1},
  title: { type: String, required: true },
  category: { type: String, required: true },
  taskCompleted: { type: String, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
