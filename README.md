# HỆ THỐNG QUẢN LÝ THIẾT BỊ PHÒNG HỌC TRÊN NỀN TẢNG ĐÁM MÂY

## 1. Giới thiệu đề tài
Hệ thống quản lý thông tin thiết bị phòng học, theo dõi trạng thái sử dụng và cập nhật dữ liệu trực tuyến.

## 2. Công nghệ sử dụng
- Frontend: React (Vite)
- Backend: Node.js, Express RESTful API
- Database: MongoDB Atlas
- Triển khai: Docker, Docker Hub, Render

## 3. Cấu trúc thư mục
- `/backend`: Mã nguồn Node.js/Express API
- `/frontend`: Mã nguồn giao diện React

## 4. Đường dẫn triển khai
- URL Frontend (Render): Đang cập nhật
- URL Backend API (Render): Đang cập nhật
- Docker Backend: Đang cập nhật
- Docker Frontend: Đang cập nhật

### Hướng dẫn chạy Backend bằng Docker
```bash
docker pull phuc1305/backend:latest
docker run -d -p 5000:5000 -e PORT=5000 -e MONGODB_URI="mongodb+srv://235646_DangHoangPhuc:phuc123@cluster0.ht1auwu.mongodb.net/235646_DangHoangPhuc?retryWrites=true&w=majority" phuc1305/backend:latest
```

### Hướng dẫn chạy Frontend bằng Docker
```bash
docker pull phuc1305/frontend:latest
docker run -d -p 8080:80 phuc1305/frontend:latest
```

### Câu 7. Triển khai frontend lên Render
- Tên dịch vụ: web-235646
- URL Frontend: https://web-235646.onrender.com

### Câu 8. Triển khai backend lên Render
- Tên dịch vụ: api-235646
- URL Backend: https://api-235646.onrender.com
- Endpoint Health: https://api-235646.onrender.com/health
- API Danh sách thiết bị: https://api-235646.onrender.com/api/devices
