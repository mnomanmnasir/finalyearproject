const db = require("../models");
const config = require("../config/auth.config");
const { user: User, role: Role, refreshToken: RefreshToken } = db;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    throw error;
  }
}
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.aggregate([
//       {
//         $lookup: {
//           from: "roles",
//           localField: "roles",
//           foreignField: "_id",
//           as: "roles"
//         }
//       },
//       {
//         $match: {
//           "roles.name": "user"
//         }
//       },
//       {
//         $project: {
//           password: 0 // Exclude the password field if it exists
//         }
//       }
//     ]);

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to retrieve Users', error: error.message });
//     console.log(error.message);
//   }
// };
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles"
        }
      },
      {
        $match: {
          "roles.name": "user",
          $expr: { $eq: [{ $size: "$roles" }, 1] } // Match where the number of roles is 1
        }
      },
      {
        $project: {
          password: 0 // Exclude the password field if it exists
        }
      }
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve Users', error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id).populate("roles");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

exports.getSystemUser = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "roles",
          foreignField: "_id",
          as: "roles"
        }
      },
      {
        $match: {
          $or: [
            {
              $and: [
                { "roles.name": "user" },
                { "roles": { $not: { $size: 1 } } }
              ]
            },
            { "roles.name": { $ne: "user" } }
          ]
        }
      },
      {
        $project: {
          password: 0 // Exclude the password field if it exists
        }
      }
    ]);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const user = await User.count()
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
};

exports.addSystemUser = async (req, res) => {
  if (req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.created_by, req.body.roles) {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists!' });
    }
    const user = await new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      status: 'active',
      created_by: req.body.created_by
    });
    const role = await Role.findOne({ name: req.body.roles });
    if (role == null) {
      return res.status(400).send({ message: 'Role is not correct!' });
    }
    user.roles = [role._id];
    // console.log('user: ', user);
    const newUser = await user.save();
    res.json({
      message: 'System User added successfully!',
      _id: newUser._id
    });

  } else {
    return res.status(400).send({ message: 'Some fields are missing!' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.userId, req.body.firstName, req.body.lastName, req.body.email, req.body.status) {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      if (req.body.status != 'active' && req.body.status != 'inactive') {
        return res.status(400).json({ message: 'Status is not correct!' });
      }
      if (user.email != req.body.email) {
        const email = User.findOne({ email: req.body.email });
        if (email == null) {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.status = req.body.status;
          const newUser = await user.save();
          res.json(newUser);
        } else {
          return res.status(400).json({ message: 'Email already exists for some other user!' });
        }
      } else {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.status = req.body.status;
        const newUser = await user.save();
        res.json(newUser);
      }
    } else {
      return res.status(400).json({ message: 'Some fields are missing!' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Failed to update User', error: e.message });
    console.log(e.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    if (req.body.email, req.body.oldPassword, req.body.newPassword) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: 'User does not exists! Please register for account' });
      }
      const match = await bcrypt.compare(req.body.oldPassword, user.password);
      if (match) {
        if (req.body.oldPassword == req.body.newPassword) {
          return res.status(400).json({ message: 'New password and old password should not be same!' });
        }
        const newPassword = await bcrypt.hash(req.body.newPassword, 8);
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully!' });
      } else {
        return res.status(400).json({ message: 'Old password donot match!' });
      }
    } else {
      return res.status(400).json({ message: 'Some fields are missing!' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Failed to reset Password!', error: e.message });
    console.log(e.message);
  }
};

exports.resetPassword = async (req, res) => {
  // const randomNumber = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) ) + min;
  // }
  try {
    if (req.body.email) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: 'User does not exists! Please register for account' });
      }
      const random = crypto.randomBytes(3).toString('hex');
      user.otp = { code: random, time: Date.now() };
      await user.save();
      const email = await emailFunction(req.body.email, random, 'mailer2.html'); // sending email
      if (email == true) {
        res.json({ message: 'Email sent successfully!' });
      } else {
        return res.status(500).json({ message: 'There is an error in sending email!' });
      }
    } else {
      return res.status(400).json({ message: 'Some fields are missing!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset Password!', error: error.message });
    console.log(error.message);
  }
};

// exports.resetPassword = async (req, res) => {
//   const randomNumber = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) ) + min;
//   }
//   try {
//     if(req.body.email) {
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) {
//         return res.status(404).json({ message: 'User does not exists! Please register for account' });
//       }
//       const random = randomNumber(100000, 999999);
//       user.verification = { code: random, verified: false, time: Date.now() };
//       await user.save();
//       const email = await emailFunction(req.body.email, random, 'mailer.html'); // sending email
//       if(email == true) {
//         res.json({message: 'Email sent successfully!'});
//       } else {
//         return res.status(500).json({ message: 'There is an error in sending email!' });
//       }
//     } else {
//       return res.status(400).json({ message: 'Some fields are missing!' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to reset Password!', error: error.message });
//     console.log(error.message);
//   }
// };

exports.verifyReset = async (req, res) => {
  try {
    if (req.body.email, req.body.code) {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      if (user.verification.code != req.body.code) {
        return res.status(400).json({ message: 'Verification failed: Code does not match!' });
      }
      let time = Date.now();
      let timeDB = user.verification.time;
      if ((time - (1000 * 60 * 30)) > timeDB) {
        return res.status(400).json({ message: 'Code expired: Please request new email' });
      }
      user.verification = { ...user.verification, verified: true };
      await user.save();
      res.json({ message: 'Email verified successfully!' });
    } else {
      return res.status(400).json({ message: 'Some fields are missing!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset Password!', error: error.message });
    console.log(error.message);
  }
};

exports.newPassword = async (req, res) => {
  try {
    if (req.body.email, req.body.code, req.body.password) {
      let user = await User.findOne({ email: req.body.email }).populate("roles", "-__v");
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      if (user.verification.code == null || user.verification.code == undefined) {
        return res.status(400).json({ message: 'Verification failed: Please call verify-api first!' });
      }
      if (user.verification.code != req.body.code) {
        return res.status(400).json({ message: 'Verification failed: Code does not match!' });
      }
      if (user.verification.verified == false) {
        return res.status(400).json({ message: 'Verification failed: Start the procedure again!' });
      }
      const password = await bcrypt.hash(req.body.password, 8);
      user.password = password;
      let time = Date.now();
      let timeDB = user.verification.time;
      if ((time - (1000 * 60 * 30)) > timeDB) {
        return res.status(400).json({ message: 'Code expired: Please request new email' });
      }
      user.verification = {};
      await user.save();
      // if(user.roles.includes('654fb564e53dde10c07d921c') || user.roles.includes('654fb564e53dde10c07d921d')) {
      // } else {
      //   res.status(201).json({message: 'Password Reset Successfully! Now you could login with your new password'});
      // }
      let token = jwt.sign({ id: user.id, roles: user.roles }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      let refreshToken = await RefreshToken.createToken(user), authorities = [];
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
    } else {
      return res.status(400).json({ message: 'Some fields are missing!' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset Password!', error: error.message });
    console.log(error.message);
  }
};

const emailFunction = (userEmail, verification, file) => {
  let nodemailer = require('nodemailer');
  let handlebars = require('handlebars');
  let fs = require('fs').promises;

  const smtpTransport = nodemailer.createTransport({
    service: 'outlook',
    host: 'smtp-mail.outlook.com',
    // secure: true,
    port: 587,
    auth: {
      user: 'umarcreator@outlook.com',
      pass: 'lqqsfmxmcemaethp'
    }
  });
  const email = async (html) => {
    const template = handlebars.compile(html);
    const replacements = {
      code: verification
    };
    const htmlToSend = template(replacements);
    const mailOptions = {
      from: 'umarcreator@outlook.com',
      to: userEmail,
      subject: 'Verify Your Account - NFC Bizz',
      html: htmlToSend
    };
    try {
      const info = await smtpTransport.sendMail(mailOptions);
      // console.log('email sent: ', info);
      return true;
    } catch (e) {
      // console.log("Error in email: ", e);
      return false;
    }
  }
  async function readData(file) {
    const fileDir = 'assets/' + file;
    const data = await fs.readFile(fileDir, { encoding: 'utf-8' });
    const result = await email(data);
    return result;
  }
  const result = readData(file);
  return result;
};