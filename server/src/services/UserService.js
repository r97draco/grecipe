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

const updateUserByIdForFamily = async (userId, familyId) => {
  const updateData = { family: familyId };
  return UserModel.findByIdAndUpdate(userId, updateData, { new: true });
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  const result = await UserModel.deleteOne({
    _id: userId,
  });
  if (result.n === 0) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  updateUserByIdForFamily,
};
