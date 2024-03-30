const express = require('express');
const cors = require('cors');
const connectDB = require('./middlewares/db');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173']
}));

connectDB()
  .then(() => {
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/boards', boardRoutes);
    app.use('/api', listRoutes);
    app.use('/api/lists', taskRoutes);
    

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });
