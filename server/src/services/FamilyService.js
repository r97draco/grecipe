const Family = require('../models/Family');
const User = require('../models/User');

const createFamily = async (familyData) => {
  const newFamily = new Family(familyData);
  await newFamily.save();
  return newFamily;
};

const getFamilyById = async (familyId) => {
  const family = await Family.findById(familyId).populate('members');
  return family;
};

const addMember = async (familyId, memberId) => {
  const updatedFamily = await Family.findByIdAndUpdate(
    familyId,
    {
      $addToSet: { members: memberId },
    },
    { new: true }
  ).populate('members');

  await User.findByIdAndUpdate(memberId, { family: familyId });

  return updatedFamily;
};

const removeMember = async (familyId, memberId) => {
  const updatedFamily = await Family.findByIdAndUpdate(
    familyId,
    {
      $pull: { members: memberId },
    },
    { new: true }
  ).populate('members');

  await User.findByIdAndUpdate(memberId, { $unset: { family: '' } });

  return updatedFamily;
};

const deleteFamilyById = async (familyId) => {
  await Family.findByIdAndRemove(familyId);
};

module.exports = {
  createFamily,
  getFamilyById,
  addMember,
  removeMember,
  deleteFamilyById,
};
