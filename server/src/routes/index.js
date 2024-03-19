const express = require('express');
//Import Family User and Recipe routes
const userRoutes = require('./UserRoutes');
const router = express.Router();

//Add routes
router.use('/user', userRoutes);

module.exports = router;
