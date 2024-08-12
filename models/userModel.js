const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You must provide an email address'],
    unique: [true, 'Email already used.'],
  },
  password: {
    type: String,
    required: [true, 'You must provide a password.'],
  },
  accountType: { type: String, default: 'Starter' },
  joindate: { type: String, default: new Date().toLocaleDateString() },
  movements: {
    type: Array,
    default: [
      {
        date: new Date(),
        amount: 500,
        transactionName: 'Bankist Starter Pack Gift',
      },
      { date: new Date(), amount: 500, transactionName: 'Credit' },
    ],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
