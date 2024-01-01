const { authJwt } = require("../middlewares");
const controller = require("../controllers/product.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/products", controller.getAllProducts);
  // app.get("/api/v1/products-count", controller.getProductCount);
  app.post("/api/v1/product", controller.createProduct);
  app.put("/api/v1/product", controller.updateProduct);
  app.delete("/api/v1/product", controller.deleteProduct);
//   app.delete("/api/v1/card", [authJwt.verifyToken], deleteController.deleteUser);
};
