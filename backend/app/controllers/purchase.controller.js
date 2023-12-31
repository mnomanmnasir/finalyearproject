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

// exports.getPurchases = async (req, res) => {
//     try {
//         const purchases = await Purchase.find().populate("products");

//         for (let purchase of purchases) {
//             for (let i = 0; i < purchase.products.length; i++) {
//                 const inventoryItem = await Inventory.findOne({ product: purchase.products[i]._id });
//                 console.log(inventoryItem);
//                 purchase.products[i] = purchase.products[i].toObject(); // Convert Mongoose document to plain object
//                 purchase.products[i].quantity = inventoryItem ? inventoryItem.quantity : 0;
//             }
//         }

//         res.status(200).send(purchases);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

exports.getPurchases = async (req, res) => {
    try {
        // Populate products in the purchase documents
        const purchases = await Purchase.find().populate("product").populate("products.product");
        res.status(200).send(purchases);
    } catch (error) {
        res.status(500).send(error);
    }
};







exports.createPurchases = async (req, res) => {
    console.log(req.body.products);

    try {
        //     const purchaseProducts = [];
        //     for (let productData of req.body.products) {
        //         let product;

        //         // Create or Update Product
        //         if (!productData._id || productData._id === "") {
        //             // Create new product
        //             product = new Product({
        //                 name: productData.name,
        //                 unitPrice: productData.unitPrice,
        //                 // Add any other relevant product fields here
        //             });
        //         } else {
        //             // Update existing product
        //             product = await Product.findById(productData._id);
        //             if (!product) {
        //                 return res.status(404).send({ message: `Product with ID ${productData._id} not found` });
        //             }
        //             product.unitPrice = productData.unitPrice; // Update unitPrice or any other fields
        //         }
        //         await product.save();

        //         // Handle Inventory Update or Creation
        //         let inventory = await Inventory.findOne({ product: product._id, warehouse: productData.warehouseId });
        //         if (inventory) {
        //             // Update existing inventory
        //             inventory.quantityOnHand += productData.quantity; // Modify based on your quantity update logic
        //         } else {
        //             // Create new inventory record
        //             inventory = new Inventory({
        //                 product: product._id,
        //                 warehouse: productData.warehouseId,
        //                 quantityOnHand: productData.quantity
        //             });
        //         }
        //         await inventory.save();

        //         // Add product and its quantity to the purchaseProducts array
        //         purchaseProducts.push({
        //             product: product._id,
        //             quantity: productData.quantity
        //         });
        //     }

        //     // Create new purchase with the array of product objects
        //     const newPurchase = new Purchase({
        //         ...req.body,
        //         products: purchaseProducts
        //     });
        //     await newPurchase.save();

        // res.status(201).send(newPurchase);
        res.status(201).send(req.body);
    } catch (error) {
        res.status(400).send({ message: 'Error processing request', error: error });
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