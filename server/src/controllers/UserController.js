const userService = require('../services/UserService');
const User = require('../models/User'); // Adjust the path as necessary
const Family = require('../models/Family'); // Adjust the path as necessary
const { default: mongoose } = require('mongoose');

const createUser = async (req, res, next) => {
  console.log('Creating User Hit');
  try {
    const user = await userService.createUser({
      email: req.body.email,
      userName: req.body.userName,
      photoURL: req.body.photoURL,
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  console.log('Get User Hit');
  try {
    console.log('req', req.query);
    const user = await userService.getUserByEmail(req.query.email);
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
  const { email, userName, isFamilyHead, familyId } = req.body;
  const userId = req.params.userId;
  // const user = await userService.getUserByEmail(req.params.email);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ error: 'Invalid user ID' });
  }

  if (familyId && !mongoose.Types.ObjectId.isValid(familyId)) {
    return res.status(400).send({ error: 'Invalid family ID' });
  }

  const updateData = {
    email,
    userName,
    isFamilyHead,
    ...(familyId && { family: familyId }),
  };

  try {
    // Optionally verify if the family exists before updating
    if (familyId) {
      const familyExists = await Family.findById(familyId);
      if (!familyExists) {
        return res.status(404).send({ error: 'Family not found' });
      }
      // Optionally add the user to the family's members if not already included
      if (!familyExists.members.includes(userId)) {
        familyExists.members.push(userId);
        await familyExists.save();
      }
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
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
