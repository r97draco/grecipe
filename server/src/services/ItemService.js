const ItemModel = require('../models/Items');
const ApiError = require('../utils/ApiError');

const ItemsService = {
  async createItem(itemData) {
    try {
      return await ItemModel.create(itemData);
    } catch (error) {
      throw new ApiError(500, 'Error creating grocery item');
    }
  },

  async createItems(itemsData) {
    try {
      return await ItemModel.insertMany(itemsData);
    } catch (error) {
      throw new ApiError(500, 'Error creating grocery items', error.message);
    }
  },

  async updateItem(id, updateData) {
    try {
      return await ItemModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new ApiError(500, 'Error updating grocery item');
    }
  },

  async deleteItem(id) {
    try {
      return await ItemModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ApiError(500, 'Error deleting grocery item');
    }
  },

  async getItemsByUser(userId) {
    try {
      return await ItemModel.find({ userId });
    } catch (error) {
      throw new ApiError(500, 'Error retrieving grocery items');
    }
  },
};

module.exports = ItemsService;
