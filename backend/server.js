const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConfig = require("./app/config/db.config");

const app = express();
require('dotenv').config();

let corsOptions = {
  origin: [`http://${process.env.HOST}`, `http://${process.env.HOST}:${process.env.PORT}`, `http://localhost:3000`],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
// mongodb+srv://ahadmansoori110:<password>@cluster0.zl2tt8h.mongodb.net/
  // .connect('mongodb+srv://umarcreator:tu0ce0f0@cluster0.cpl0ubc.mongodb.net/?retryWrites=true&w=majority', {
db.mongoose
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  .connect('mongodb+srv://ahadmansoori110:mansoori17@cluster0.zl2tt8h.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    initialUser();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Warehouse application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/purchase.routes")(app);
require("./app/routes/inventory.routes")(app);
require("./app/routes/warehouse.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/carrier.routes")(app);
require("./app/routes/shipment.routes")(app);
require("./app/routes/dashboard.routes")(app);
// require("./app/routes/social.routes")(app);
// require("./app/routes/ticket.routes")(app);
// require("./app/routes/card.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// static/images, etc
app.use('/static', express.static(path.join(__dirname, 'public')));

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
function initialUser() {
  User.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      const roles = await Role.findOne({ name: "admin" });
      // console.log("roles",roles.mongooseCollection);
      if (roles) {
        new User({
          firstName: "test",
          lastName: "user",
          email: "test@test.com",
          password: "$2a$08$81IdAvtI89yWrST.mncgMurKSspFJgUd9/7E29nU45HDfpqp9o7ji",
          roles: [roles._id],
          created_by: "server",
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to users collection");
        });
      }
    }
  });
}

