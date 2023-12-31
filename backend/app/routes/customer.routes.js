const { authJwt } = require("../middlewares");
const controller = require("../controllers/customer.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/customers", controller.getCustomers);
  app.post("/api/v1/customer", controller.createCustomer);
//   app.put("/api/v1/customer", controller.updateCustomer);
//   app.delete("/api/v1/customer", controller.deleteCustomer);
//   app.delete("/api/v1/card", [authJwt.verifyToken], deleteController.deleteUser);
};
