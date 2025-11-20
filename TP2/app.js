const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const systemRoutes = require('./routes/systemRoutes');

const app = express();

connectDB();
app.use(express.json());

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/', userRoutes);
app.use('/', uploadRoutes);
app.use('/', systemRoutes);

module.exports = app;
