# Đề tài: Quản lý thiết bị phòng họk- Sinh viên thực hiện: Đặng Hoàng Phúc- MSSV: 235646- Lớp: Kỹ thuật phần mềm
---

### 4. Đường dẫn triển khai- URL Frontend (Render): https://web-235646.onrender.com
- URL Backend API (Render): https://api-235646.onrender.com
- Docker Backend: https://hub.docker.com/r/phuc1305/backend
- Docker Frontend: https://hub.docker.com/r/phuc1305/frontend

---

### Câu 5. Đóng gói backend bằng Docker và đẩy lên Docker Hub
- Docker Hub Image: https://hub.docker.com/r/phuc1305/backend
- Lệnh kéo và chạy Backend Docker:
```bash
docker pull phuc1305/backend:latest
docker run -d -p 5000:5000 -e PORT=5000 -e MONGODB_URI="mongodb+srv://235646_DangHoangPhuc:phuc123@cluster0.ht1auwu.mongodb.net/235646_DangHoangPhuc?retryWrites=true&w=majority" phuc1305/backend:latest
```

---

### Câu 6. Đóng gói frontend b��ng Docker và đẩy lên Docker Hub
- Docker Hub Image: https://hub.docker.com/r/phuc1305/frontend
- Lệnh kéo và chạy Frontend Docker:
```bash
docker pull phuc1305/frontend:latest
docker run -d -p 8080:80 phuc1305/frontend:latest
```

---

### Câu 7. Triển khai frontend lên Render
- Tên dịch vụ: web-235646
- URL Frontend: https://web-235646.onrender.com

---

### Câu 8. Triển khai backend lên Render
- Tên dịch vụ: api-235646
- URL Backend: https://api-235646.onrender.com
- Endpoint Health: https://api-235646.onrender.com/health
- API Danh sách thiết bị: https://api-235646.onrender.com/api/devices
