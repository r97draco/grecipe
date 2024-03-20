const GroceryItemService = require('../services/ItemService');
const UserService = require('../services/UserService');

const createItem = async (req, res, next) => {
  try {
    const item = await GroceryItemService.createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

const createItems = async (req, res, next) => {
  try {
    let user = await UserService.getUserByEmail(req.headers.email);

    const itemObjects = req.body.items.map((item) => ({
      ...item,
      userId: user._id,
    }));

    const items = await GroceryItemService.createItems(itemObjects);
    res.status(201).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getItemsByUser = async (req, res, next) => {
  try {
    const user = await UserService.getUserByEmail(req.user.email);

    const items = await GroceryItemService.getItemsByUser(user._id);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedItem = await GroceryItemService.updateItem(id, req.body);
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await GroceryItemService.deleteItem(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createItem,
  createItems,
  getItemsByUser,
  updateItem,
  deleteItem,
};
