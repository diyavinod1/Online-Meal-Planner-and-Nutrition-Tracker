require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const Food = require('./models/Food');
const foodData = require('./data/foodData');

// Import routes
const authRoutes = require('./routes/auth');
const mealRoutes = require('./routes/meals');
const foodRoutes = require('./routes/foods');
const waterRoutes = require('./routes/water');
const progressRoutes = require('./routes/progress');

const app = express();

// Connect to MongoDB and make sure the default food library exists.
async function startServer() {
  await connectDB();
  await Food.bulkWrite(foodData.map(food => ({
    updateOne: {
      filter: { name: food.name, isCustom: false },
      update: { $setOnInsert: { ...food, isCustom: false } },
      upsert: true,
    },
  })));
  const foodCount = await Food.countDocuments({ isCustom: false });
  console.log(`🍽️  Food library ready: ${foodCount} default foods.`);


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/progress', progressRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler Middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🍽️  MEAL PLANNER API SERVER RUNNING    ║
║                                            ║
║   Port: ${PORT}                             ║
║   Environment: ${process.env.NODE_ENV || 'development'}               ║
║   Time: ${new Date().toLocaleString()}      ║
╚════════════════════════════════════════════╝
  `);
});
}

startServer().catch((err) => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});