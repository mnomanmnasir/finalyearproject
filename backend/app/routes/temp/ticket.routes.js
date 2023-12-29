const { authJwt } = require("../middlewares");
const controller = require("../controllers/ticket.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/v1/ticket", [authJwt.verifyToken], controller.getAllTickets);
//   app.get("/api/v1/ticket", [authJwt.verifyToken], controller.getUserCount);
  app.post("/api/v1/ticket", [authJwt.verifyToken], controller.createTicket);
  app.put("/api/v1/ticket", [authJwt.verifyToken], controller.updateTicket);
//   app.delete("/api/v1/ticket", [authJwt.verifyToken], controller.updateUser);
};
