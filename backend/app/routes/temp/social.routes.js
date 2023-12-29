const { authJwt } = require("../middlewares");
const controller = require("../controllers/social.controller");


module.exports = function (app) {
    const baseURL = "/api/v1";
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.get(baseURL + '/socials', controller.getAllSocials);
    // app.get(baseURL + '/social/:id', [authJwt.verifyToken], controller.getSocial);
    app.post(baseURL + '/social', [authJwt.verifyToken], controller.createSocial);
    // app.put(baseURL + '/social', [authJwt.verifyToken], controller.updateSocial);
    app.delete(baseURL + '/social', [authJwt.verifyToken], controller.deleteSocial);
};
