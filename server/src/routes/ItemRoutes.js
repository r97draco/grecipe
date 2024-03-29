const express = require('express');
const multer = require('multer');
const {
  updateItem,
  deleteItem,
  getItemsByUser,
  createItems,
  createItem,
  getItemsByFamily
} = require('../controllers/ItemsController');
const { parseReceipt } = require('../controllers/ReceiptController');

const authMiddleware = require('../middlewares/auth');

const upload = multer({ dest: 'uploads/' });

const inventoryRouter = express.Router();

inventoryRouter.get('/', authMiddleware, getItemsByUser);
inventoryRouter.get('/family', authMiddleware, getItemsByFamily)
inventoryRouter.post('/add', authMiddleware, createItems);
inventoryRouter.put('/update/:id', updateItem);
inventoryRouter.delete('/delete/:id', deleteItem);
inventoryRouter.post('/upload', upload.single('receipt'), parseReceipt);

module.exports = inventoryRouter;
