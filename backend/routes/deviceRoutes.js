const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// 1. GET /api/devices và GET /api/devices?search=...
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query = {
        $or: [
          { deviceId: regex },
          { name: regex },
          { deviceType: regex },
          { room: regex },
        ],
      };
    }

    const devices = await Device.find(query).sort({ createdAt: -1 });
    return res.status(200).json(devices);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

// 2. GET /api/devices/:id (Xem chi tiết một thiết bị)
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    }
    return res.status(200).json(device);
  } catch (error) {
    return res.status(400).json({ message: 'ID không hợp lệ hoặc lỗi truy vấn', error: error.message });
  }
});

// 3. POST /api/devices (Thêm thiết bị mới)
router.post('/', async (req, res) => {
  try {
    const { deviceId, name, deviceType, room, quantity, status, brand, model, purchaseDate, description } = req.body;

    if (!deviceId || !name || !deviceType || !room) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ: deviceId, name, deviceType, room' });
    }

    const existingDevice = await Device.findOne({ deviceId: deviceId.trim() });
    if (existingDevice) {
      return res.status(409).json({ message: 'Mã thiết bị (deviceId) đã tồn tại' });
    }

    const newDevice = new Device({
      deviceId: deviceId.trim(),
      name: name.trim(),
      deviceType,
      room,
      quantity: quantity || 1,
      status: status || 'Đang sử dụng',
      brand,
      model,
      purchaseDate,
      description,
    });

    const savedDevice = await newDevice.save();
    return res.status(201).json(savedDevice);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi khi lưu thiết bị', error: error.message });
  }
});

// 4. PUT /api/devices/:id (Cập nhật thông tin thiết bị)
router.put('/:id', async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (deviceId) {
      const duplicate = await Device.findOne({
        deviceId: deviceId.trim(),
        _id: { $ne: req.params.id },
      });
      if (duplicate) {
        return res.status(409).json({ message: 'Mã thiết bị đã được sử dụng bởi thiết bị khác' });
      }
    }

    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDevice) {
      return res.status(404).json({ message: 'Không tìm thấy thiết bị để cập nhật' });
    }

    return res.status(200).json(updatedDevice);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi khi cập nhật thiết bị', error: error.message });
  }
});

// 5. DELETE /api/devices/:id (Xóa thiết bị)
router.delete('/:id', async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice) {
      return res.status(404).json({ message: 'Không tìm thấy thiết bị để xóa' });
    }
    return res.status(200).json({ message: 'Xóa thiết bị thành công' });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi khi xóa thiết bị', error: error.message });
  }
});

module.exports = router;
