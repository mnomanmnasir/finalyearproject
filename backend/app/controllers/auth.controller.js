const config = require("../config/auth.config");
const db = require("../models");
const { user: User, card: Card, role: Role, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log(req);
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    // cardId: req.body.cardId,
    // cardType: req.body.type,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    status: req.body.status,
    created_by: req.body.created_by
  });

  // const card = new Card({
  //   cardId: req.body.cardId,
  //   cardType: req.body.cardType,
  //   created_by: req.body.created_by
  // });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            // res.send({ id: user.id, message: "User was registered successfully!" });
          });
          // card.user = user.id;
          // card.url = process.env.ACTION_URL + card._id;

          // card.save((err) => {
          //   if (err) {
          //     user.deleteOne({ id: user.id });
          //     res.status(500).send({ message: err });
          //     return;
          //   }
          //   res.send({ id: user.id, cardId: card.id, message: "User was registered successfully!" });
          // });
            res.send({ id: user.id,  message: "User was registered successfully!" });
          // user.updateOne({ _id: user.id }, {
          //   $set: { card: card.id }
          // });
          // res.send({ id: user.id, cardId: card.id, message: "User was registered successfully!" });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // res.send({ id: user.id, message: "User was registered successfully!" });
        });
        // card.user = user.id;
        // card.url = process.env.ACTION_URL + card._id;

        // card.save((err) => {
        //   if (err) {
        //     user.deleteOne({ id: user.id });
        //     res.status(500).send({ message: err });
        //     return;
        //   }
          res.send({ id: user.id, message: "User was registered successfully!" });
        // });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Invalid Email or Password!" });
      }
      // console.log(req.body.password);
      // console.log(user.password);
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
        );
        // console.log(passwordIsValid);
      

        if (!passwordIsValid) {
        if(user.otp.code) {
          let time = Date.now();
          let timeDB = user.otp.time;
          if((time-(1000*60*30)) > timeDB) {
            return res.status(400).json({ message: 'OTP for Login expired: Go to forgot password to generate new one!' });
          }
          if(user.otp.code != req.body.password) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
            });
          }
          user.otp = {};
          await user.save();
        } else {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
      }
      // user.updateOne({ _id: user.id }, { $currentDate: { last_login: true } });

      let token = jwt.sign({ id: user.id, roles: user.roles }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: authorities,
        last_login: user.last_login,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};
exports.signinWithCard = (req, res) => {
  // User.findOne({
  //   _id: req.body.userId,
  // })
  User.findById(req.body.userId)
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Invalid card or Password!" });
      }
      // console.log(req.body.password);
      // console.log(user.password);
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
        );
        // console.log(passwordIsValid);
      

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      // user.updateOne({ _id: user.id }, { $currentDate: { last_login: true } });

      let token = jwt.sign({ id: user.id, roles: user.roles }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: authorities,
        last_login: user.last_login,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};
exports.cardAuth = (req, res) => {
  Card.findOne({
    cardId: req.body.cardId,
  })
    .populate("roles", "-__v").populate("user")
    .exec(async (err, card) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!card) {
        return res.status(404).send({ message: "Invalid card! " });
      }

      res.status(200).send({
        userId: card.user._id,
        firstName: card.user.firstName,
        lastName: card.user.lastName
      });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};