# PTT Academy - Sàn Giáo Dục Thương Mại Điện Tử

> **Demo**: [https://ai-edu-flatform.vercel.app/](https://ai-edu-flatform.vercel.app/)  
> **Github**: [https://github.com/phantuanthanh1582000/ai-edu-flatform](https://github.com/phantuanthanh1582000/ai-edu-flatform)

---

## Giới thiệu

**PTT Academy** là nền tảng giáo dục thương mại điện tử tích hợp AI, nơi người dùng có thể:

- Tìm kiếm và lọc khóa học theo danh mục, giá
- Yêu thích, thêm vào giỏ hàng, xem chi tiết sản phẩm
- Gợi ý khóa học thông minh dựa trên hành vi người dùng (AI)
- Chatbot hỗ trợ tìm khóa học
- Đăng nhập / Đăng ký / Quản lý thông tin cá nhân
- Thanh toán khóa học
- Đánh giá, bình luận khoá học
- Lưu lịch sử đã xem
- Giao diện responsive hiện đại, hỗ trợ mobile/tablet

---

## Công nghệ sử dụng

- **ReactJS** + Vite
- **Ant Design** - UI Framework
- **React Router DOM** - Routing
- **Axios** - Gọi API
- **Mock AI Suggestion** - Gợi ý sản phẩm
- **LocalStorage** - Lưu trạng thái người dùng
- **Chatbot** - Hỗ trợ tìm khóa học thông minh

---

## Tính năng chính

### 1. Đăng ký / Đăng nhập

- Form đăng ký/đăng nhập
- Validation thông tin người dùng
- Giao diện đẹp, dễ dùng

### 2. Danh sách khóa học

- Hiển thị: ảnh, tên, giá, mô tả, badge khuyến mãi, đánh giá
- Lọc theo giá (`<200K`, `200K–500K`, `>500K`)
- Lọc theo danh mục
- Tìm kiếm theo tên khóa học

### 3. Giỏ hàng

- Thêm/Xóa khoá học
- Hiển thị tổng tiền
- Nút “Thanh toán”

### 4. Gợi ý thông minh (AI)

- Dựa trên giỏ hàng / yêu thích
- Nếu không có dữ liệu, sẽ hiển thị toàn bộ khoá học

### 5. Yêu thích

- Lưu/huỷ bằng icon trái tim
- Trang riêng hiển thị danh sách đã yêu thích (trong profile)

### 6. Chi tiết khoá học

- Hiển thị mô tả dài, hình ảnh, đánh giá, nhận xét, thanh toán

### 7. Lịch sử đã xem

- Hiển thị 4 khóa học xem gần nhất
- Hiển thị trong trang chi tiết khóa học

### 8. Đánh giá & bình luận

- Đánh giá sao, bình luận
- Chỉ cho phép khi người dùng đã đăng nhập

### 9. Hồ sơ cá nhân

- Hiển thị và chỉnh sửa thông tin cá nhân: avatar, số điện thoại, địa chỉ,...

### 10. Chatbot

- Trò chuyện AI hỗ trợ tìm khóa học
- Có thể click khoá học trong chat để xem chi tiết

---

## Hướng dẫn chạy dự án

```bash
git clone https://github.com/phantuanthanh1582000/ai-edu-flatform.git
cd ai-edu-flatform
npm install
npm run dev
```

---

## 📁 Cấu trúc thư mục

```bash
src/
├── assets/              # Tài nguyên tĩnh: ảnh
├── components/
│   ├── layout/          # Thành phần bố cục chính: Header, Footer, layout.user
│   ├── page/            # Các trang chính: Home, Login, Register, Profile, Cart,...
│   ├── share/           # Component tái sử dụng chung
├── services/            # Gọi API giả
├── data/                # Dữ liệu mock
├── styles/              # SCSS
├── global/              # Context toàn cục: AuthContext
├── router/              # Cấu hình route các trang
├── utils/               # Hàm tiện ích (format,...)
└── main.jsx             # Khởi tạo ứng dụng

```

---

## 🧪 Gợi ý kiểm thử

- Tìm khóa học → thanh tìm kiếm
- Lọc khóa học → chọn danh mục hoặc mức giá
- Bấm "❤️" → thêm vào yêu thích
- Bấm "Thanh toán" → xác nhận đơn hàng
- Chatbot → chọn từ khoá, click khoá học
- Truy cập trang chi tiết → kiểm tra lịch sử xem
- Đăng nhập, chỉnh sửa avatar, thông tin, xem yêu thích

---

## 📦 Triển khai & môi trường

**Deploy**: [https://ai-edu-flatform.vercel.app](https://ai-edu-flatform.vercel.app)

**Biến môi trường:**

```env
VITE_BACKEND_URL=https://api.pttacademy.com
```

---

## 👨‍💼 Tác giả

- 👤 **Phan Tuấn Thành**
- 📧 [tphan10932@gmail.com](mailto:tphan10932@gmail.com)
- 🔗 Github: [phantuanthanh1582000](https://github.com/phantuanthanh1582000)
