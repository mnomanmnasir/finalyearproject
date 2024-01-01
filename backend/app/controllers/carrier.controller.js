const db = require("../models");
const { carrier: Carrier } = db;

exports.getCarriers = async (req, res) => {
    try {
        const carriers = await Carrier.find();
        res.status(200).json(carriers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carriers', error: error.message });
    }
};

exports.createCarrier = async (req, res) => {
    try {
        const newCarrier = new Carrier(req.body);
        const savedCarrier = await newCarrier.save();
        res.status(201).json(savedCarrier);
    } catch (error) {
        res.status(400).json({ message: 'Error creating carrier', error: error.message });
    }
}

exports.updateCarrier = async (req, res) => {
    try {
        const updatedCarrier = await Carrier.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedCarrier) {
            return res.status(404).json({ message: 'Carrier not found' });
        }
        res.status(200).json(updatedCarrier);
    } catch (error) {
        res.status(500).json({ message: 'Error updating carrier', error: error.message });
    }
};

exports.deleteCarrier = async (req, res) => {
    console.log(req.body)
    try {
      const deletedCarrier = await Carrier.findByIdAndDelete(req.body.carrierId);
      if (!deletedCarrier) {
        return res.status(404).json({ message: 'Carrier not found' });
      }
      res.status(204).json(); // Successful deletion
    } catch (error) {
      res.status(500).json({ message: 'Error deleting carrier', error: error.message });
    }
  };