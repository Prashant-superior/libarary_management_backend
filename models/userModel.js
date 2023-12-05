const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Member'], default: 'Member' },
  reservedBooks: [{
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    reservedAt: { type: Date, default: Date.now },
    // returnedAt: { type: Date },
  }],
  bookReservationHistory: [{
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    reservedAt: { type: Date, required: true },
    returnedAt: { type: Date },
  }],
});

const User = model('User', userSchema);

module.exports = User;
