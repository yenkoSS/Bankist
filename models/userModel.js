const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You must provide an email address.'],
    unique: [true, 'Email already used.'],
  },
  password: { type: String, required: [true, 'You must provide a password.'] },
  balance: { type: Number, default: 1000 },
  movements: { type: Array, default: [] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
