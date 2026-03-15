import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Book, SiteConfig } from '../types';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

interface BookDetailProps {
  books: Book[];
  config: SiteConfig;
}

const BookDetail: React.FC<BookDetailProps> = ({ books, config }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (books.length > 0) {
      const foundBook = books.find(b => b._id === id || b.id === id);
      if (foundBook) {
        setBook(foundBook);
      }
    }
  }, [id, books]);

  if (!book && books.length > 0) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl text-white font-serif mb-4">Không tìm thấy bài viết</h2>
        <Link to="/blog" className="text-brand-orange hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Quay lại Blog
        </Link>
      </div>
    );
  }

  if (!book) return null; // Loading handled by App.tsx main loader

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-20">
      {/* Immersive Header */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={book.coverUrl} 
            alt="" 
            className="w-full h-full object-cover blur-2xl opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center md:items-end md:justify-start gap-8 pb-12">
          <div className="w-48 md:w-64 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden border border-white/10 flex-shrink-0 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white backdrop-blur-md border border-white/10">
                {book.category}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-4 leading-tight">
              {book.title}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-neutral-400 text-sm">
              <span className="flex items-center gap-2"><User size={16} style={{ color: config.themeColor }} /> {book.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16} style={{ color: config.themeColor }} /> {book.dateAdded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-neutral-800">
           <button onClick={() => navigate(-1)} className="text-neutral-400 hover:text-white flex items-center gap-2 transition-colors">
             <ArrowLeft size={18} /> Quay lại
           </button>
           <div className="flex gap-4">
             <button className="text-neutral-400 hover:text-brand-orange transition-colors"><Share2 size={18} /></button>
           </div>
        </div>

        {/* Summary Box */}
        <div className="bg-brand-dark p-8 rounded-2xl border-l-4 mb-12 italic text-neutral-300 text-lg leading-relaxed shadow-lg"
             style={{ borderLeftColor: config.themeColor }}>
          "{book.summary}"
        </div>

        {/* Main Review Content */}
        <div className="prose prose-invert prose-orange max-w-none">
          <div className="text-neutral-300 space-y-6 leading-loose text-lg font-light first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-white">
            {book.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer of the article */}
        <div className="mt-20 pt-10 border-t border-neutral-800 text-center">
           <p className="text-neutral-500 text-sm mb-6">Hy vọng bài review này giúp bạn chọn được cuốn sách ưng ý!</p>
           <Link 
             to="/blog" 
             className="inline-block px-8 py-3 rounded-full text-white font-bold transition-all hover:scale-105"
             style={{ backgroundColor: config.themeColor }}
           >
             Khám phá thêm nhiều sách khác
           </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;