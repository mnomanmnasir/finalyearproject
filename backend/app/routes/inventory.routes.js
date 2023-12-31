const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/inventory.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/inventory", controller.getAllInventory);
    // app.post("/api/v1/inventory", controller.createPurchases);
    app.put("/api/v1/inventory", controller.updateInventory);
    // app.delete("/api/v1/inventory", controller.deletePurchases);
};
