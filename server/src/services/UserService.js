const UserModel = require('../models/User');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  return UserModel.create(userBody);
};

const getUserById = async (id) => UserModel.findOne({ _id: id }).exec();

const getUserByEmail = async (email) => UserModel.findOne({ email }).exec();

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
