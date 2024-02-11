const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

/* Configuring Cross-Origin Resource Sharing (CORS)*/
app.use(
  cors({
    origin: '*',
  })
);

/* These lines of code are configuring the middleware for parsing incoming request bodies in different
formats. */
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
  res.send('Hello World!');
});

/* This code is responsible for starting the server and listening on a specific port. */
const PORT = process.env.PORT || 9191;
app.listen(PORT, () => console.log(`[Server] - Running on port ${PORT}`));
