const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Qeydiyyat
router.post('/qeydiyyat', async (req, res) => {
  try {
    const { istifadəçiAdı, şifrə } = req.body;

    const mövcud = await Admin.findOne({ istifadəçiAdı });
    if (mövcud) return res.status(400).json({ xəta: 'Bu istifadəçi artıq var!' });

    const hashŞifrə = await bcrypt.hash(şifrə, 10);
    const admin = new Admin({ istifadəçiAdı, şifrə: hashŞifrə });
    await admin.save();

    res.status(201).json({ mesaj: 'Admin yaradıldı!' });
  } catch (err) {
    res.status(500).json({ xəta: err.message });
  }
});

// Giriş
router.post('/login', async (req, res) => {
  try {
    const { istifadəçiAdı, şifrə } = req.body;

    const admin = await Admin.findOne({ istifadəçiAdı });
    if (!admin) return res.status(400).json({ xəta: 'İstifadəçi tapılmadı!' });

    const düzgündür = await bcrypt.compare(şifrə, admin.şifrə);
    if (!düzgündür) return res.status(400).json({ xəta: 'Şifrə yanlışdır!' });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ xəta: err.message });
  }
});

module.exports = router;