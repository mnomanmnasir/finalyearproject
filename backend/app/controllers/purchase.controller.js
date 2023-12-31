const db = require("../models");
const { purchase: Purchase, product: Product, inventory: Inventory } = db;

exports.getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate("products");
        res.status(200).send(purchases);
    } catch (error) {
        res.status(500).send(error);
    }
}

// exports.getPurchase = async (req, res) => {
//     try {
//         const purchase = await Purchase.findById(req.params.id);
//         if (!purchase) {
//             return res.status(404).send();
//         }
//         res.status(200).send(purchase);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

exports.getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().populate("products");

        for (let purchase of purchases) {
            for (let i = 0; i < purchase.products.length; i++) {
                const inventoryItem = await Inventory.findOne({ product: purchase.products[i]._id });
                // const inventoryItem = await Inventory.find();
                console.log(inventoryItem);
                purchase.products[i] = purchase.products[i].toObject(); // Convert Mongoose document to plain object
                purchase.products[i].quantity = inventoryItem ? inventoryItem.quantity : 0;
            }
        }

        res.status(200).send(purchases);
    } catch (error) {
        res.status(500).send(error);
    }
};



exports.createPurchases = async (req, res) => {
    // try {
    //     const newPurchase = new Purchase(req.body);
    //     await newPurchase.save();
    //     res.status(201).send(newPurchase);
    // } catch (error) {
    //     res.status(400).send(error);
    // }

    try {
        // Handle products
        const productIds = [];
        for (let productData of req.body.products) {
            console.log(productData)
            let product;
            if (!productData._id || productData._id === "") {
                // Create new product
                product = new Product({
                    name: productData.name,
                    // quantity: productData.quantity,
                    unitPrice: productData.unitPrice
                    // created_by: productData.created_by
                });
            } else {
                // Update existing product
                product = await Product.findById(productData._id);
                if (product) {
                    await Inventory.updateOne({ product: product._id }, { $inc: { quantity: product.quantity } });
                    // product.quantity += productData.quantity;
                    product.unitPrice = productData.unitPrice;
                } else {
                    return res.status(404).send({ message: `Product with ID ${productData.id} not found` });
                }
            }
            await product.save();
            productIds.push(product._id);
        }

        // Create new purchase with the array of product IDs
        const newPurchase = new Purchase({
            ...req.body,
            products: productIds
        });
        await newPurchase.save();

        res.status(201).send(newPurchase);
    } catch (error) {
        res.status(400).send(error);
    }

}

exports.updatePurchases = async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id);
        if (!purchase) {
            return res.status(404).send();
        }
        res.status(200).send(purchase);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deletePurchases = async (req, res) => {
    try {
        const purchase = await Purchase.findByIdAndDelete(req.params.id);
        if (!purchase) {
            return res.status(404).send();
        }
        res.status(200).send(purchase);
    } catch (error) {
        res.status(500).send(error);
    }
}