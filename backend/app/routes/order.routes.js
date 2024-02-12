const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/order.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/orders", controller.getOrders);
    // app.get("/api/v1/order", controller.getOrders);
    app.post("/api/v1/order", controller.createOrder);
    app.put("/api/v1/order", controller.updateOrder);
    // app.delete("/api/v1/order", controller.deleteOrder);
};
