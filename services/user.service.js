const db = require("../config/db");
const { JWT_SECRET, JWT_OPTIONS } = require('../constant/jwt.config');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.createUser = async(req,res) =>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = await generatePassword(req.body.password);
  let userData = await userModel({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
    password: password
  }).save();
    return userData._id;
}
