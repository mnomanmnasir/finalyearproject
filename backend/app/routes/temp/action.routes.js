const { authJwt } = require("../middlewares");
const controller = require("../controllers/action.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/v1/action', [authJwt.verifyToken], controller.createAction);

    //http://127.0.0.1:5500/index.html?id=654e83354a3b5b081401c1a0
    
    app.get('/api/v1/action', controller.getAction);
    app.get('/api/v1/actions/:cardId', [authJwt.verifyToken], controller.getAllActionsForCard);
    
    app.post('/api/v1/connection', [authJwt.verifyToken], controller.createConnection);
    app.delete('/api/v1/connection', [authJwt.verifyToken], controller.deleteConnection);
    app.put('/api/v1/linkedtree', [authJwt.verifyToken], controller.updateLinkedTree);
    app.put('/api/v1/website', [authJwt.verifyToken], controller.updateWebsite);
    app.put('/api/v1/doc', [authJwt.verifyToken], controller.updateDoc);

    app.post('/api/v1/action-count', [authJwt.verifyToken], controller.getActionCount);
};
