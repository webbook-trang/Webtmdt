import React, { useState } from 'react';
import { Book, BookCategory, SiteConfig } from '../types';
import { Plus, Trash2, Edit2, LogOut, X, Settings, BookOpen, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminProps {
  books: Book[];
  config: SiteConfig;
  onAddBook: (book: Omit<Book, '_id'>) => Promise<void>;
  onEditBook: (book: Book) => Promise<void>;
  onDeleteBook: (mongoId: string) => Promise<void>;
  onUpdateConfig: (config: SiteConfig) => Promise<void>;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ books, config, onAddBook, onEditBook, onDeleteBook, onUpdateConfig, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'books' | 'settings'>('books');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Book Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<BookCategory>(BookCategory.SelfHelp);
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  
  // Config Form State
  const [configForm, setConfigForm] = useState<SiteConfig>(config);
  const [error, setError] = useState<string | null>(null);

  const resetBookForm = () => {
    setTitle('');
    setAuthor('');
    setSummary('');
    setContent('');
    setCoverUrl('');
    setIsFeatured(false);
    setEditingId(null);
    setCategory(BookCategory.SelfHelp);
    setError(null);
  };

  const loadBookForEdit = (book: Book) => {
    if (!book._id) return;
    setEditingId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setSummary(book.summary);
    setContent(book.content);
    setCoverUrl(book.coverUrl);
    setIsFeatured(book.isFeatured);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!title || !author || !summary) {
        setError("Vui lòng điền các trường bắt buộc.");
        return;
    }

    setIsSubmitting(true);
    try {
      const bookData = {
        title,
        author,
        category,
        summary,
        content,
        coverUrl: coverUrl || `https://picsum.photos/seed/${Date.now()}/400/600`,
        isFeatured,
        dateAdded: new Date().toISOString().split('T')[0]
      };

      if (editingId) {
        await onEditBook({ ...bookData, _id: editingId });
        alert("Cập nhật thành công!");
      } else {
        await onAddBook(bookData);
        alert("Đã đăng bài mới!");
      }
      resetBookForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdateConfig(configForm);
      alert("Đã lưu cấu hình!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="font-serif text-4xl text-white">Bảng Điều Khiển Admin</h1>
            <p className="text-neutral-500 text-sm mt-1">Lưu trữ dữ liệu trên MongoDB Cloud</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
               <button onClick={() => setActiveTab('books')} className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'books' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}>
                 <BookOpen size={16} /> <span>Sách</span>
               </button>
               <button onClick={() => setActiveTab('settings')} className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}>
                 <Settings size={16} /> <span>Cấu Hình Web</span>
               </button>
             </div>
            <button onClick={onLogout} className="p-2 text-neutral-400 hover:text-red-400 bg-neutral-900 rounded-lg border border-neutral-800">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {activeTab === 'books' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className={`p-8 rounded-xl border transition-colors ${editingId ? 'bg-neutral-900/50 border-brand-orange/50' : 'bg-brand-dark border-neutral-800'}`}>
                <h2 className="text-xl text-white font-medium flex items-center mb-6">
                  {editingId ? <Edit2 size={20} className="mr-2 text-brand-orange" /> : <Plus size={20} className="mr-2 text-brand-orange" />}
                  {editingId ? 'Chỉnh Sửa Sách' : 'Thêm Sách Mới'}
                </h2>
                <form onSubmit={handleBookSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-brand-orange outline-none" placeholder="Tiêu Đề" />
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-brand-orange outline-none" placeholder="Tác Giả" />
                  </div>
                  <select value={category} onChange={(e) => setCategory(e.target.value as BookCategory)} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white">
                    {Object.values(BookCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-brand-orange outline-none" placeholder="Tóm tắt ngắn..." />
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-brand-orange outline-none" placeholder="Review chi tiết..." />
                  <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white" placeholder="URL Ảnh Bìa" />
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="feat" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-brand-orange" />
                    <label htmlFor="feat" className="text-neutral-300 text-sm">Nổi bật trên trang chủ</label>
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full bg-brand-orange text-white font-bold py-3 rounded hover:bg-brand-orangeHover transition-colors flex items-center justify-center gap-2">
                    {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                    {editingId ? 'Cập Nhật' : 'Đăng Bài'}
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-brand-dark p-8 rounded-xl border border-neutral-800">
                <h2 className="text-xl text-white mb-6 font-medium">Thư Viện DB</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                   {books.map(book => (
                     <div key={book._id} className="flex items-center space-x-3 p-3 bg-neutral-900 rounded border border-transparent hover:border-neutral-700 transition-all">
                        <img src={book.coverUrl} className="w-10 h-14 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{book.title}</p>
                          <p className="text-neutral-500 text-xs truncate">{book.category}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button onClick={() => loadBookForEdit(book)} className="text-neutral-400 hover:text-white"><Edit2 size={14} /></button>
                          <button onClick={() => book._id && onDeleteBook(book._id)} className="text-neutral-400 hover:text-red-500"><Trash2 size={14} /></button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-brand-dark p-8 rounded-xl border border-neutral-800">
               <h2 className="text-xl text-white font-medium mb-6 flex items-center">
                 <Settings size={20} className="mr-2 text-brand-orange" /> Cấu Hình Website (MongoDB)
               </h2>
               <form onSubmit={handleConfigSubmit} className="space-y-6">
                 <input type="text" value={configForm.siteName} onChange={(e) => setConfigForm({...configForm, siteName: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white" placeholder="Tên Website" />
                 <input type="color" value={configForm.themeColor} onChange={(e) => setConfigForm({...configForm, themeColor: e.target.value})} className="h-10 w-full bg-neutral-900 border border-neutral-700 rounded cursor-pointer" />
                 <input type="text" value={configForm.heroMainText} onChange={(e) => setConfigForm({...configForm, heroMainText: e.target.value})} className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white" placeholder="Tiêu đề chính" />
                 <button disabled={isSubmitting} type="submit" className="w-full bg-brand-orange text-white font-bold py-3 rounded flex items-center justify-center gap-2">
                   {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                   <Save size={18} /> Lưu Cấu Hình
                 </button>
               </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;