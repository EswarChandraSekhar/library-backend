const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: {type: String,required: true},
  title: { type: String, required: true },
  category: { type: String, required: true },
  taskCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
