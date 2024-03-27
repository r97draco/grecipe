const express = require('express');
const {
  createFamily,
  getFamily,
  updateFamilyMembers,
  deleteFamily,
  getAllFamilies,
} = require('../controllers/FamilyController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const familySchema = require('../validation/ValFamily');
const router = express.Router();

router.post(
  '/createfamily',
  authMiddleware,
  validate(familySchema.createFamily),
  createFamily
);

router.get('/getallfamilies', authMiddleware, getAllFamilies);

router.get(
  '/:familyId',
  validate(familySchema.getFamily),
  authMiddleware,
  getFamily
);

router.put(
  '/updatefamily/:familyId',
  authMiddleware,
  validate(familySchema.updateFamily),
  updateFamilyMembers
);

router.delete(
  '/:familyId',
  authMiddleware,
  validate(familySchema.deleteFamily),
  deleteFamily
);

module.exports = router;
