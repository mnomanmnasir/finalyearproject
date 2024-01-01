const { authJwt } = require("../middlewares");
const controller = require("../controllers/shipment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/shipments", controller.getShipments);
  app.post("/api/v1/shipment", controller.createShipment);
  app.put("/api/v1/shipment", controller.updateShipment);
  app.delete("/api/v1/shipment", controller.deleteShipment);
//   app.delete("/api/v1/card", [authJwt.verifyToken], deleteController.deleteUser);
};
