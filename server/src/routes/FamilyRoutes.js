const express = require('express');
const {
  createFamily,
  getFamily,
  updateFamilyMembers,
  deleteFamily,
} = require('../controllers/FamilyController');
const authMiddleware = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const familySchema = require('../validation/ValFamily');
const router = express.Router();

router.post(
  '/createfamily',
  validate(familySchema.createFamily),
  authMiddleware,
  createFamily
);

router.get(
  '/:familyId',
  validate(familySchema.getFamily),
  authMiddleware,
  getFamily
);

router.put(
  '/updatefamily/:familyId',
  validate(familySchema.updateFamily),
  authMiddleware,
  updateFamilyMembers
);

router.delete(
  '/:familyId',
  validate(familySchema.deleteFamily),
  authMiddleware,
  deleteFamily
);

module.exports = router;
