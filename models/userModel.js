const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You must provide an email address.'],
    unique: [true, 'Email already used.'],
  },
  password: { type: String, required: [true, 'You must provide a password.'] },
  joindate: { type: String, default: new Date() },
  movements: {
    type: Array,
    default: [
      {
        date: new Date(),
        amount: 500,
        transaction: 'Bankist Starter Pack Gift',
      },
    ],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
