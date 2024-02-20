/* Import Statements */
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require('./config/connectDB');

/* Configuring Cross-Origin Resource Sharing (CORS)*/
app.use(
  cors({
    origin: '*',
  })
);

/* Configuring the middleware for parsing incoming requests in different formats. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/* Root URL handler */
app.get('/', (req, res) => {
  console.log(`[GET /] - ${new Date().toISOString()}`);
  res.send('Server is Running!');
});

/* Starting the server and listening on a specific port. */
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 9191;
    app.listen(PORT, () => console.log(`[Server] - Running on port ${PORT}`));
  })
  .catch((e) => {
    console.log('Error while starting the server');
    console.error(e);
  });
