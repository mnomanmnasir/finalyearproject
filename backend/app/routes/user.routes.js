const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
// const deleteController = require("../controllers/delete.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess)
  
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/v1/users", controller.getAllUsers);
  // app.get("/api/v1/users", [authJwt.verifyToken, authJwt.verifyAdminToken], controller.getAllUsers);
  app.get("/api/v1/system-users", [authJwt.verifyToken], controller.getSystemUser);
  app.get("/api/v1/user", controller.getUser);
  app.get("/api/v1/users-count", [authJwt.verifyToken], controller.getUserCount);
  app.put("/api/v1/user", controller.updateUser);
  // app.put("/api/v1/user", [authJwt.verifyToken], controller.updateUser);
  // app.delete("/api/v1/user", [authJwt.verifyToken], deleteController.deleteUser);

  app.post("/api/v1/user/add-system-user", [authJwt.verifyToken, authJwt.verifyAdminTokenSecure], controller.addSystemUser);

  app.post("/api/v1/user", controller.createUser);
  
  app.post("/api/v1/user/change-password", [authJwt.verifyToken], controller.changePassword);
  // reset password
  app.post("/api/v1/user/reset", controller.resetPassword);
  // app.post("/api/v1/user/verify-reset", controller.verifyReset);
  // app.post("/api/v1/user/reset-password", controller.newPassword);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
