const db = require("../models");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const ses = require("nodemailer-ses-transport");

const User = db.users;
const transporter = nodemailer.createTransport(
  ses({
    accessKeyId: "<AWS Access Key>",
    secretAccessKey: "<AWS Secret Key>",
    region: "us-east-1", // Change this to your AWS region
  })
);

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  const password = hash;

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
    isActive: req.body.isActive ? req.body.isActive : false,
    isBanned: req.body.isBanned ? req.body.isBanned : false,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.resetPassword = async (req, res) => {
  const id = req.params.id;
  const randomPassword = generatePassword(8);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(randomPassword, salt);
  const password = hash;

  User.findByIdAndUpdate(
    id,
    { password: password },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        const mailOptions = {
          from: "charitharanasingha@gmail.com",
          to: data.email,
          subject: "Password Change : Delanta",
          html: `Hi<p>Please find your new password to access Delanta : ${randomPassword}</p><p>Thank you</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending test email:", error);
            return res
              .status(500)
              .json({ message: "Error sending reset email" });
          }

          res.status(200).json({ message: "Reset email sent successfully" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
  User.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

function generatePassword(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
}
