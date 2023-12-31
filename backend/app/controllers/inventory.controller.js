const db = require("../models");
const { inventory: Inventory } = db;

exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find().populate("product").populate("warehouse");
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};