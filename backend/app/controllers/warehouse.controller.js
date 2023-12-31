const db = require("../models");
const { warehouse: Warehouse } = db;

// Create a Warehouse
exports.createWarehouse = async (req, res) => {
    try {
        const warehouse = new Warehouse(req.body);
        await warehouse.save();
        res.status(201).send(warehouse);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get All Warehouses
exports.getAllWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.status(200).send(warehouses);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a Single Warehouse
exports.getWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.body._id);
        if (!warehouse) {
            return res.status(404).send();
        }
        res.status(200).send(warehouse);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a Warehouse
exports.updateWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndUpdate(req.body._id, req.body, { new: true, runValidators: true });
        if (!warehouse) {
            return res.status(404).send();
        }
        res.status(200).send(warehouse);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a Warehouse
exports.deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!warehouse) {
            return res.status(404).send();
        }
        res.status(200).send(warehouse);
    } catch (error) {
        res.status(500).send(error);
    }
};