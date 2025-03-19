//app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./routes/user');
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use('/api/user', userRoute);

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT || 8080, () => {
  console.log(`Listening on port: ${PORT}`);
});
