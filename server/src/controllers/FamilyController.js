const familyService = require('../services/FamilyService');

const createFamily = async (req, res, next) => {
  const familyData = {
    name: req.body.name,
  };
  try {
    const family = await familyService.createFamily(familyData);
    res.status(201).json(family);
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
      updatedFamily = await familyService.addMember(
        req.params.familyId,
        memberId
      );
    } else if (action === 'remove') {
      updatedFamily = await familyService.removeMember(
        req.params.familyId,
        memberId
      );
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
  updateFamilyMembers,
  deleteFamily,
};
