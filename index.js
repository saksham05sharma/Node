const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Import and use the users' API routes
const usersRouter = require('./routes/api/users');
app.use('/api/users', usersRouter);

// Start the server
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
