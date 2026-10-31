import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const initialForm = {
    deviceId: '',
    name: '',
    deviceType: 'Máy chiếu',
    room: '',
    brand: '',
    model: '',
    quantity: 1,
    status: 'Đang sử dụng',
    purchaseDate: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchDevices = async (keyword = '') => {
    setLoading(true);
    setError('');
    try {
      const url = keyword ? `${API_BASE}/devices?search=${encodeURIComponent(keyword)}` : `${API_BASE}/devices`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Không thể tải danh sách thiết bị');
      const data = await res.json();
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDevices(search);
  };

  const handleOpenAdd = () => {
    setFormData(initialForm);
    setSelectedDevice(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (dev) => {
    setSelectedDevice(dev);
    setFormData(dev);
    setModalOpen(true);
  };

  const handleOpenDetail = (dev) => {
    setSelectedDevice(dev);
    setDetailModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa thiết bị này không?')) return;
    try {
      const res = await fetch(`${API_BASE}/devices/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
      setSuccess('Xóa thiết bị thành công!');
      fetchDevices(search);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const method = selectedDevice ? 'PUT' : 'POST';
    const url = selectedDevice ? `${API_BASE}/devices/${selectedDevice._id}` : `${API_BASE}/devices`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Thao tác không thành công');

      setSuccess(selectedDevice ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
      setModalOpen(false);
      fetchDevices(search);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Đang sử dụng': return 'status-using';
      case 'Hư hỏng': return 'status-broken';
      case 'Đang sửa chữa': return 'status-fixing';
      case 'Ngừng sử dụng': return 'status-retired';
      default: return '';
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Hệ Thống Quản Lý Thiết Bị Phòng Học</h1>
        <button className="btn-success" onClick={handleOpenAdd}>+ Thêm thiết bị mới</button>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-info">{success}</div>}

      <form className="actions-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Tìm kiếm theo mã, tên, loại, phòng học..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn-primary">Tìm kiếm</button>
        <button type="button" className="btn-secondary" onClick={() => { setSearch(''); fetchDevices(''); }}>Đặt lại</button>
      </form>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Mã TB</th>
              <th>Tên thiết bị</th>
              <th>Loại thiết bị</th>
              <th>Phòng học</th>
              <th>Số lượng</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {devices.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>Chưa có thiết bị nào</td></tr>
            ) : (
              devices.map((d) => (
                <tr key={d._id}>
                  <td><strong>{d.deviceId}</strong></td>
                  <td>{d.name}</td>
                  <td>{d.deviceType}</td>
                  <td>{d.room}</td>
                  <td>{d.quantity}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(d.status)}`}>{d.status}</span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ marginRight: '5px' }} onClick={() => handleOpenDetail(d)}>Chi tiết</button>
                    <button className="btn-edit" onClick={() => handleOpenEdit(d)}>Sửa</button>
                    <button className="btn-danger" onClick={() => handleDelete(d._id)}>Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal Thêm / Sửa */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{selectedDevice ? 'Cập Nhật Thiết Bị' : 'Thêm Thiết Bị Mới'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Mã thiết bị (*):</label>
                <input required value={formData.deviceId} onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Tên thiết bị (*):</label>
                <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Loại thiết bị (*):</label>
                <input required value={formData.deviceType} onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Phòng học (*):</label>
                <input required value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Thương hiệu:</label>
                <input value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Model:</label>
                <input value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Số lượng:</label>
                <input type="number" min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} />
              </div>
              <div className="form-group">
                <label>Tình trạng:</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="Đang sử dụng">Đang sử dụng</option>
                  <option value="Hư hỏng">Hư hỏng</option>
                  <option value="Đang sửa chữa">Đang sửa chữa</option>
                  <option value="Ngừng sử dụng">Ngừng sử dụng</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mô tả:</label>
                <textarea rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>Đóng</button>
                <button type="submit" className="btn-primary">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xem Chi Tiết */}
      {detailModalOpen && selectedDevice && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Chi Tiết Thiết Bị</h2>
            <div style={{ marginTop: '15px', lineHeight: '1.8' }}>
              <p><strong>Mã thiết bị:</strong> {selectedDevice.deviceId}</p>
              <p><strong>Tên thiết bị:</strong> {selectedDevice.name}</p>
              <p><strong>Loại thiết bị:</strong> {selectedDevice.deviceType}</p>
              <p><strong>Phòng học:</strong> {selectedDevice.room}</p>
              <p><strong>Hãng sản xuất:</strong> {selectedDevice.brand || 'Chưa cập nhật'}</p>
              <p><strong>Model:</strong> {selectedDevice.model || 'Chưa cập nhật'}</p>
              <p><strong>Số lượng:</strong> {selectedDevice.quantity}</p>
              <p><strong>Tình trạng:</strong> {selectedDevice.status}</p>
              <p><strong>Mô tả:</strong> {selectedDevice.description || 'Không có ghi chú'}</p>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button className="btn-secondary" onClick={() => setDetailModalOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
