const db = require("../models");
const { customer: Customer } = db;

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ message: 'Error creating customer', error: error.message });
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    console.log(req.body)
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(req.body.customerId);
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(204).json(); // Successful deletion
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
  };