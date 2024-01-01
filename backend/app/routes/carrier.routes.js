const { authJwt } = require("../middlewares");
const controller = require("../controllers/carrier.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/carriers", controller.getCarriers);
  app.post("/api/v1/carrier", controller.createCarrier);
  app.put("/api/v1/carrier", controller.updateCarrier);
  app.delete("/api/v1/carrier", controller.deleteCarrier);
//   app.delete("/api/v1/card", [authJwt.verifyToken], deleteController.deleteUser);
};
