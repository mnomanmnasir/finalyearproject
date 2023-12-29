const { authJwt } = require("../middlewares");
const controller = require("../controllers/card.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/cards", [authJwt.verifyToken], controller.getAllCards);
  app.post("/api/v1/card", [authJwt.verifyToken], controller.getCard);
  app.put("/api/v1/card", [authJwt.verifyToken], controller.updateCard);
  app.delete("/api/v1/card", [authJwt.verifyToken], deleteController.deleteUser);
};
