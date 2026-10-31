const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: [true, 'Mã thiết bị không được để trống'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Tên thiết bị không được để trống'],
      trim: true,
    },
    deviceType: {
      type: String,
      required: [true, 'Loại thiết bị không được để trống'],
    },
    room: {
      type: String,
      required: [true, 'Phòng học không được để trống'],
    },
    brand: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      required: [true, 'Số lượng không được để trống'],
      min: [1, 'Số lượng tối thiểu là 1'],
      default: 1,
    },
    status: {
      type: String,
      required: true,
      enum: ['Đang sử dụng', 'Hư hỏng', 'Đang sửa chữa', 'Ngừng sử dụng'],
      default: 'Đang sử dụng',
    },
    purchaseDate: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Device', deviceSchema);
