const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

var _users = mongoose.model('Users', userSchema);
module.exports = _users;
