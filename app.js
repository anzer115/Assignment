const express = require('express');
require('dotenv').config();
const path = require('path');
const multer = require('multer');
const connectToDatabase = require('./mongoose-connection/mongoose-connection');
const { organizationRouter } = require('./routes/organizationRoutes');
const { teamRouter } = require('./routes/teamRoutes');
const { memberRouter } = require('./routes/memberRoutes');

// Initialize app
const app = express();

// Connect to MongoDB
connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup for file uploads
const upload = multer({
  dest: path.join(__dirname, 'uploads/'),
});

app.use('/', organizationRouter);
app.use('/', teamRouter);
app.use('/', memberRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
