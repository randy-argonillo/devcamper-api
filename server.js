const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const _colors = require('colors');

const db = require('./config/db');
const errorMiddleware = require('./middlewares/errorHandler');


// Load env variables
dotenv.config({ path: './config/.env' });

// Load db
db.connect();

// Initialize express
const app = express();

// Middlewares
app.use(morgan('dev')); // logger
app.use(express.json()) // to parse the body payload

// Mount routes middleware
app.use('/api/v1/bootcamps', require('./routes/bootcamps').router);

app.use(errorMiddleware)

// Start server
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.green.bold)
);

// Global Promise error handler
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message} \n ${err.stack}`.red);
  server.close(() => process.exit(1));
});
