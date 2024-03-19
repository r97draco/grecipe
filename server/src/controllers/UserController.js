const userService = require('../services/UserService');

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser({
      email: req.body.email,
      userName: req.body.name,
      photoURL: req.body.photoURL,
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserByEmail(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(409).json({ message: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const updateData = {
    isFamilyHead: req.body.isFamilyHead,
    family: req.body.familyId,
  };
  try {
    const user = await userService.updateUserById(
      req.params.userId,
      updateData
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUserById(req.params.userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
