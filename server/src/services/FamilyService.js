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

const findAll = async () => {
  const families = await Family.find().populate('members');
  return families;
};

const addMember = async (familyId, memberId) => {
  const updatedFamily = await Family.findByIdAndUpdate(
    familyId,
    {
      $addToSet: { members: memberId },
    },
    { new: true }
  ).populate('members');
  // logger.info("Addmember in FamilyService.js");

  await User.findByIdAndUpdate(memberId, { family: familyId, isFamilyHead: false});

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
  await User.updateMany({ family: familyId }, { $unset: { family: '' } });
};



module.exports = {
  createFamily,
  getFamilyById,
  findAll,
  addMember,
  removeMember,
  deleteFamilyById,
};
