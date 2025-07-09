const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config();
const cors = require('cors')
const helmet = require('helmet')

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(helmet())
// Middleware
app.use(bodyParser.json());
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/auth',authRoutes)


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
