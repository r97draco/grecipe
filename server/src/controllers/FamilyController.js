const familyService = require('../services/FamilyService');
const userService = require('../services/UserService');

const createFamily = async (req, res, next) => {
  const familyData = {
    name: req.body.name,
    members: req.body.members,
    isFamilyHead: req.body.isFamilyHead,
    userId: req.body.userId,
  };
  console.log('familyData', familyData);
  try {
    const family = await familyService.createFamily(familyData);
    const user = await userService.updateUserByIdForFamily(
      req.body.userId,
      family._id
    );
    res.status(201).json(family);
  } catch (err) {
    next(err);
  }
};

const getAllFamilies = async (req, res, next) => {
  try {
    const families = await familyService.findAll();
    res.status(200).json(families);
  } catch (err) {
    next(err);
  }
};

const getFamily = async (req, res, next) => {
  try {
    const family = await familyService.getFamilyById(req.params.familyId);
    if (family) {
      res.status(200).json(family);
    } else {
      res.status(404).json({ message: 'Family not found' });
    }
  } catch (err) {
    next(err);
  }
};

const updateFamilyMembers = async (req, res, next) => {
  const { action, memberId } = req.body;

  try {
    let updatedFamily;
    if (action === 'add') {
      try {
        updatedFamily = await familyService.addMember(
          req.params.familyId,
          memberId
        );
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: 'Failed to add member to family' });
      }
    } else if (action === 'remove') {
      try {
        updatedFamily = await familyService.removeMember(
          req.params.familyId,
          memberId
        );
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: 'Failed to remove member from family' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    if (updatedFamily) {
      res.status(200).json({
        message: `Member ${action === 'add' ? 'added to' : 'removed from'} family successfully`,
        family: updatedFamily,
      });
    } else {
      res.status(404).json({ message: 'Family not found' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteFamily = async (req, res, next) => {
  try {
    await familyService.deleteFamilyById(req.params.familyId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFamily,
  getFamily,
  getAllFamilies,
  updateFamilyMembers,
  deleteFamily,
};
