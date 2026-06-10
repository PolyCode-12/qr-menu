const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const menuRoutes = require('./routes/menu');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB qoşuldu!'))
  .catch((err) => console.log('Xəta:', err));

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('QR Menyu API işləyir!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});