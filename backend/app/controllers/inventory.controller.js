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

exports.updateInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true });
        if (!inventory) {
            return res.status(404).send();
        }
        res.status(200).send(inventory);
    } catch (error) {
        res.status(400).send(error);
    }
};