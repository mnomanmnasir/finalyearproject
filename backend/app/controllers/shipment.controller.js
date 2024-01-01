const db = require("../models");
const { shipment: Shipment, order: Order, carrier: Carrier } = db;

exports.getShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find().populate("order").populate("carrier");
        res.status(200).json(shipments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shipments', error: error.message });
    }
};

exports.createShipment = async (req, res) => {
    try {
        const newShipment = new Shipment(req.body);
        const savedShipment = await newShipment.save();
        res.status(201).json(savedShipment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating shipment', error: error.message });
    }
}

exports.updateShipment = async (req, res) => {
    try {
        const updatedShipment = await Shipment.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedShipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.status(200).json(updatedShipment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shipment', error: error.message });
    }
};

exports.deleteShipment = async (req, res) => {
    console.log(req.body)
    try {
        const deletedShipment = await Shipment.findByIdAndDelete(req.body.shipmentId);
        if (!deletedShipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.status(204).json(); // Successful deletion
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shipment', error: error.message });
    }
};