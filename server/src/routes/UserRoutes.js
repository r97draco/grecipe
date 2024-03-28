const express = require('express');
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userSchema = require('../validation/ValUser');
const router = express.Router();

router.get('/getuser', getUser);

router.delete('/:userId', validate(userSchema.deleteUser), deleteUser);

router.post('/createuser', validate(userSchema.createUser), createUser);

router.put('/updateuser/:userId', validate(userSchema.updateUser), updateUser);

router.get('/testinguser', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
