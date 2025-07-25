const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const todoRoutes = require('./routes/todoRoutes');
const lostItemsRoutes = require('./routes/lostitemRoutes');
const foundItemRoutes = require('./routes/founditemRoutes');
const matchRoutes = require('./routes/matchRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const reactionRoutes = require('./routes/reactionRoutes');



const authRoutes = require('./routes/authRoutes')
const helmet = require('helmet')
require('dotenv').config();
const cors = require('cors')

console.log(process.env.CLOUDINARY_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(helmet())
// Middleware
app.use(bodyParser.json());
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/lost-items', lostItemsRoutes);
app.use('/api/found-items', foundItemRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api/reactions', reactionRoutes);




// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
