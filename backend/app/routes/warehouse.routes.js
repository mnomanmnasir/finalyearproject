const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/warehouse.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/warehouse", controller.getAllWarehouses);
    // app.get("/api/v1/warehouse", controller.getPurchases);
    app.post("/api/v1/warehouse", controller.createWarehouse);
    app.put("/api/v1/warehouse", controller.updateWarehouse);
    app.delete("/api/v1/warehouse", controller.deleteWarehouse);
};