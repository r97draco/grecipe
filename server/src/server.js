/* Import Statements */
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require('./config/connectDB');

/* Import the controllers */
const userController = require('./controllers/UserController');
const familyController = require('./controllers/FamilyController');

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

/* Create route handlers for user and family resources */
const userRouter = express.Router();
const familyRouter = express.Router();

/* Define the routes for user resource */
userRouter.post('/', userController.createUser); // Create a new user
userRouter.get('/', userController.getUser); // Get a user by email
userRouter.put('/:userId', userController.updateUser); // Update a user by id
userRouter.delete('/:userId', userController.deleteUser); // Delete a user by id

/* Define the routes for family resource */
familyRouter.post('/', familyController.createFamily); // Create a new family
familyRouter.get('/:familyId', familyController.getFamily); // Get a family by id
familyRouter.put('/:familyId', familyController.updateFamilyMembers); // Add or remove a member from a family by id
familyRouter.delete('/:familyId', familyController.deleteFamily); // Delete a family by id

/* Use the route handlers as middleware for the /user and /family paths */
app.use('/user', userRouter);
app.use('/family', familyRouter);

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
