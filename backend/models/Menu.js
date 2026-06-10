const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  ad: { type: String, required: true },
  qiymət: { type: Number, required: true },
  kateqoriya: { type: String, required: true },
  təsvir: { type: String },
  şəkil: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);