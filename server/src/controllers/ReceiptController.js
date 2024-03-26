const fs = require("fs");
const tesseract = require("tesseract.js");
const logger = require("../config/logger");
const { parseReceiptText } = require("../utils/inventory");

const deleteFile = (filePath) => {
  fs.unlinkSync(filePath);
};

exports.parseReceipt = async (req, res, next) => {
  const { filename } = req.file;
  const filePath = "uploads/" + filename;

  logger.info("Receipt parsing initiated");
  try {
    const rawData = await tesseract.recognize(filePath, "eng");

    const items = parseReceiptText(rawData.data.text);

    deleteFile(filePath);
    logger.info("Receipt parsed successfully");
    res.status(200).json({ message: "Receipt parsed successfully", items });
  } catch (err) {
    deleteFile(filePath);
    logger.error("Error parsing receipt", err);
    next(err);
  }
};
