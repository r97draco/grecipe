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

router.get(
  '/getuser',
  // validate(userSchema.getUser),
  // authMiddleware,
  getUser
);

router.delete(
  '/:userId',
  validate(userSchema.deleteUser),
  // authMiddleware,
  deleteUser
);

router.post(
  '/createuser',
  validate(userSchema.createUser),
  // authMiddleware,
  createUser
);

router.put(
  '/updateuser/:userId',
  validate(userSchema.updateUser),
  // authMiddleware,
  updateUser
);

router.get('/testinguser', 
// authMiddleware, 
(req, res) => {
  res.send('Hello World!');
});

module.exports = router;
