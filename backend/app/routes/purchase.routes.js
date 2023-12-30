const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/purchase.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/purchase", controller.getPurchases);
    app.post("/api/v1/purchase", controller.cardAuth);
    app.put("/api/v1/purchase", controller.signinWithCard);
    app.delete("/api/v1/purchase", controller.refreshToken);
};
