
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/readwithkate';

// Cấu hình CORS - Cho phép domain của Vercel truy cập
const allowedOrigins = [
  'http://localhost:3000', // Cho môi trường dev
  'http://localhost:5173', // Cho Vite dev
  process.env.FRONTEND_URL,  // URL Vercel của bạn (cấu hình trong Environment Variables trên Render)
  process.env.FRONTEND_URL_BACKUP,  // URL Vercel của bạn (cấu hình trong Environment Variables trên Render)
].filter(Boolean) as string[];

// Fixed: Removed manual RequestHandler cast which was causing "No overload matches this call" error.
// The types from the cors package are compatible with app.use() natively.
// app.use(cors({
//   origin: (origin, callback) => {
//     // Cho phép các request không có origin (như Postman hoặc mobile apps)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'Chính sách CORS của server này không cho phép truy cập từ origin: ' + origin;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

app.use(cors({
  origin: '*'
}))

// Fixed: Removed manual RequestHandler cast which was causing "No overload matches this call" error.
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// Schema cho Sách
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  coverUrl: String,
  summary: String,
  content: String,
  isFeatured: Boolean,
  dateAdded: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const Book = mongoose.model('Book', bookSchema);

// Schema cho Cấu hình
const configSchema = new mongoose.Schema({
  siteName: String,
  heroTopText: String,
  heroMainText: String,
  heroSubText: String,
  heroImageUrl: String,
  themeColor: String
});

const Config = mongoose.model('Config', configSchema);

// API Endpoints cho Sách
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ dateAdded: -1 });
    res.json(books);
  } catch (e) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (e) {
    res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: 'Cập nhật thất bại' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: 'Xóa thất bại' });
  }
});

// API Endpoints cho Cấu hình
app.get('/api/config', async (req, res) => {
  try {
    const config = await Config.findOne();
    res.json(config);
  } catch (e) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

app.post('/api/config', async (req, res) => {
  try {
    let config = await Config.findOne();
    if (config) {
      Object.assign(config, req.body);
    } else {
      config = new Config(req.body);
    }
    await config.save();
    res.json(config);
  } catch (e) {
    res.status(400).json({ error: 'Lưu thất bại' });
  }
});

// Health check endpoint cho Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 API Server đang chạy tại cổng ${PORT}`);
});
