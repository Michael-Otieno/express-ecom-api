const User = require("../models/User");
const Role = require("../models/Role");
const config = require("../config/auth.config");
const { Op } = require('sequelize');


let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles && req.body.roles.length > 0) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.in]: req.body.roles,
          },
        },
      });

      if (roles && roles.length > 0) {
        await user.setRoles(roles);
      } else {
        // Handle the case where no valid roles were found
        return res.status(400).json({ message: "Invalid roles specified." });
      }
    } else {
      // user role = 1
      await user.setRoles([1]);
    }

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};



exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
