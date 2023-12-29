// const Product = require("../models/Product");
const db = require("../models");
const { product: Product } = db;
// Controller actions

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    res.json(res.product);
};

// Update a product by ID
exports.updateProduct= async (req, res) => {
    try {
        const updatedProduct = await res.product.set(req.body);
        await updatedProduct.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};