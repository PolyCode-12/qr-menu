const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  istifadəçiAdı: { type: String, required: true, unique: true },
  şifrə: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);