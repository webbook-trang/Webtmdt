import { Book, SiteConfig } from '../types';

// Trong môi trường production, chúng ta sẽ sử dụng URL từ Render thông qua biến môi trường
// Lưu ý: Trên Vercel, bạn cần thêm biến VITE_API_URL hoặc API_BASE_URL trong Settings
const API_BASE_URL = ('https://readwithkate.onrender.com') + '/api';

export const api = {
  // Sách
  async getBooks(): Promise<Book[]> {
    const res = await fetch(`${API_BASE_URL}/books`);
    if (!res.ok) throw new Error('Không thể tải danh sách sách');
    return res.json();
  },

  async addBook(book: Omit<Book, '_id'>): Promise<Book> {
    const res = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error('Không thể thêm sách');
    return res.json();
  },

  async updateBook(id: string, book: Partial<Book>): Promise<Book> {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error('Không thể cập nhật sách');
    return res.json();
  },

  async deleteBook(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Không thể xóa sách');
  },

  // Cấu hình
  async getConfig(): Promise<SiteConfig> {
    const res = await fetch(`${API_BASE_URL}/config`);
    if (!res.ok) throw new Error('Không thể tải cấu hình');
    return res.json();
  },

  async updateConfig(config: SiteConfig): Promise<SiteConfig> {
    const res = await fetch(`${API_BASE_URL}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    if (!res.ok) throw new Error('Không thể lưu cấu hình');
    return res.json();
  }
};