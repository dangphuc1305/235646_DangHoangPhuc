const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint kiểm tra sức khỏe hệ thống (Health check)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Định tuyến API quản lý thiết bị
app.use('/api/devices', deviceRoutes);

// Kết nối cơ sở dữ liệu MongoDB Atlas và khởi chạy máy chủ
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Kết nối MongoDB Atlas thành công');
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên cổng ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Lỗi kết nối cơ sở dữ liệu MongoDB:', err.message);
  });
