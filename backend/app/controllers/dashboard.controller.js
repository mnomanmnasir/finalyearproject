const db = require("../models");
const { product: Product, order: Order, purchase: Purchase, shipment: Shipment } = db;

exports.getCardsCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments(); // Counts all documents
        const orderCount = await Order.countDocuments(); // Counts all documents
        const purchaseCount = await Purchase.countDocuments(); // Counts all documents
        const shipmentCount = await Shipment.countDocuments(); // Counts all documents
        res.json({ products: productCount, orders: orderCount, purchases: purchaseCount, shipments: shipmentCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};