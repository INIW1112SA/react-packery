let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/auth');
let schema = new mongoose.Schema({
  //   local:
  // {
    token: String,
    name: String,
    email: String,
    password: String,
    authType: String,
    localType: String,
    loggedinStatus: Boolean,
    isEmailVerified: Boolean,
    verificationID: Number,
    photos: String,
    isnew: String
});

schema.statics.generateHash = function(password) {
    // console.log('Inside generating hashing method');
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
schema.methods.generateHashVID = function(verificationID) {
    // console.log('Inside generating hashing method');
    return bcrypt.hashSync(verificationID, bcrypt.genSaltSync(8), null);
};
schema.methods.generateHashEmail = function(email) {
    // console.log('Inside generating hashing method');
    return bcrypt.hashSync(email, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function(password) {
    // console.log('Checking password valid....');
    return bcrypt.compareSync(password, this.password);
};
schema.methods.validVID = function(verificationID) {
    // console.log('Checking password valid....');
    return bcrypt.compareSync(verificationID, this.verificationID);
};
schema.methods.validEmail = function(email) {
    // console.log('Checking password valid....');
    return bcrypt.compareSync(email, this.email);
};
schema.statics.generateToken = function(email) {
    let token = jwt.sign({
        id: email
    }, CONFIG.JWT.secret, {
        expiresIn: 15 * 60
    });
    return token;
};
let User = mongoose.model('user', schema);
module.exports = User;
