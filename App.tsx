
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BookDetail from './pages/BookDetail';
import About from './pages/About';
import Admin from './pages/Admin';
import Login from './pages/Login';
import YoutubePlaceholder from './pages/YoutubePlaceholder';
import { Book, SiteConfig } from './types';
import { api } from './services/api';
import { DEFAULT_SITE_CONFIG } from './constants';
import { Loader2 } from 'lucide-react';
import ReactGA from "react-ga4";
import GAListener from './GAListener';

ReactGA.initialize("G-GHV8HZFX9W");
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Fixed: Explicitly typed ProtectedRoute and its props to resolve the TypeScript error where 'children' were not being recognized correctly in the JSX context.
interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        const [loadedBooks, loadedConfig] = await Promise.all([
          api.getBooks(),
          api.getConfig()
        ]);
        setBooks(loadedBooks);
        if (loadedConfig) setSiteConfig(loadedConfig);
      } catch (error) {
        console.error("Lỗi khởi tạo ứng dụng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
    
    const storedAuth = sessionStorage.getItem('kate_admin_auth');
    if (storedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    if (status) sessionStorage.setItem('kate_admin_auth', 'true');
    else sessionStorage.removeItem('kate_admin_auth');
  };

  const handleUpdateConfig = async (newConfig: SiteConfig) => {
    try {
      const saved = await api.updateConfig(newConfig);
      setSiteConfig(saved);
    } catch (e) {
      alert("Lỗi khi lưu cấu hình!");
    }
  };

  const handleAddBook = async (book: Omit<Book, '_id'>) => {
    try {
      const saved = await api.addBook(book);
      setBooks([saved, ...books]);
    } catch (e) {
      alert("Lỗi khi thêm sách!");
    }
  };

  const handleEditBook = async (updatedBook: Book) => {
    if (!updatedBook._id) return;
    try {
      const saved = await api.updateBook(updatedBook._id, updatedBook);
      setBooks(books.map(b => b._id === saved._id ? saved : b));
    } catch (e) {
      alert("Lỗi khi cập nhật!");
    }
  };

  const handleDeleteBook = async (mongoId: string) => {
    try {
      await api.deleteBook(mongoId);
      setBooks(books.filter(b => b._id !== mongoId));
    } catch (e) {
      alert("Lỗi khi xóa!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <GAListener />
      <ScrollToTop />
      <div className="bg-brand-black min-h-screen text-neutral-200 font-sans selection:bg-brand-orange selection:text-white">
        <Navbar config={siteConfig} />
        <Routes>
          <Route path="/" element={<Home books={books} config={siteConfig} />} />
          <Route path="/blog" element={<Blog books={books} config={siteConfig} />} />
          <Route path="/blog/:id" element={<BookDetail books={books} config={siteConfig} />} />
          <Route path="/about" element={<About config={siteConfig} />} />
          <Route path="/youtube" element={<YoutubePlaceholder config={siteConfig} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Admin 
                  books={books} 
                  config={siteConfig}
                  onAddBook={handleAddBook} 
                  onEditBook={handleEditBook}
                  onDeleteBook={handleDeleteBook}
                  onUpdateConfig={handleUpdateConfig}
                  onLogout={() => handleLogin(false)}
                />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer config={siteConfig} />
      </div>
    </Router>
  );
};

export default App;
