const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.carrier = require("./carrier.model");
db.customer = require("./customer.model");
db.inventory = require("./inventory.model");
db.order = require("./order.model");
db.product = require("./product.model");
db.purchase = require("./purchase.model");
db.shipment = require("./shipment.model");
db.supplier = require("./supplier.model");
db.warehouse = require("./warehouse.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;