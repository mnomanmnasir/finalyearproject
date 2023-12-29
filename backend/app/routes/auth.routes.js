const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/auth/user",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
      // verifySignUp.checkDuplicateCard
      // authJwt.isAdmin
    ],
    controller.signup
  );

  app.post("/api/v1/auth/signin", controller.signin);

  // login with card
  app.post("/api/v1/auth/card", controller.cardAuth);
  app.post("/api/v1/auth/cardIn", controller.signinWithCard);

  app.post("/api/v1/auth/refreshtoken", controller.refreshToken);
};
