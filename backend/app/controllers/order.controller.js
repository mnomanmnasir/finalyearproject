const db = require("../models");
const mongoose = require('mongoose');
const { order: Order, product: Product, inventory: Inventory } = db;

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("customer");
        // const orders = await Order.find().populate("customer").populate("products").populate("products.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};
// exports.createOrder = async (req, res) => {
//     try {
//         const order = new Order(req.body);
//         await order.save();
//         res.status(201).send(order);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };

exports.createOrder = async (req, res) => {
    const { name, customer, products, pay, advance, created_by } = req.body;


    try {
        // Check product availability (Example business logic)
        for (const item of products) {
            const inventory = await Inventory.find({ where: { product: item._id } });
            if (!inventory || inventory.quantityOnHand < item.quantity) {
                return res.status(400).json({ message: `Product ${item.product} is not available in required quantity` });
            }
            // inventory.quantityReserved += item.quantity;
            // await inventory.save();
        }

        // Create the order
        const newOrder = new Order({
            name,
            customer,
            orderDate: new Date(), // Set current date as order date
            status: true, // Assuming status is true when order is created
            products,
            pay,
            advance,
            created_on: new Date(),
            created_by
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    const { _id, name, customer, products, pay, advance, created_by } = req.body;

    try {
        // Check if the order exists
        const order = await Order.findById(_id);
        if (!order) {
            return res.status(404).json({ message: `Order ${_id} not found` });
        }

        // Check product availability (Example business logic)
        for (const item of products) {
            const inventory = await Inventory.find({ where: { product: item._id } });
            if (!inventory || inventory.quantityOnHand < item.quantity) {
                return res.status(400).json({ message: `Product ${item.product} is not available in required quantity` });
            }
            // inventory.quantityReserved += item.quantity;
            // await inventory.save();
        }

        // Update the order
        order.name = name;
        order.customer = customer;
        order.products = products;
        order.pay = pay;
        order.advance = advance;
        order.updated_on = new Date();
        order.updated_by = created_by;

        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};