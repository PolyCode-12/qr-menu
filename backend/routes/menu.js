const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');
const auth = require('./middleware');

// Bütün məhsulları gətir (icazəsiz)
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ xəta: err.message });
  }
});

// Yeni məhsul əlavə et (token lazımdır)
router.post('/', auth, async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ xəta: err.message });
  }
});

// Məhsul sil (token lazımdır)
router.delete('/:id', auth, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ mesaj: 'Silindi!' });
  } catch (err) {
    res.status(500).json({ xəta: err.message });
  }
});

module.exports = router;