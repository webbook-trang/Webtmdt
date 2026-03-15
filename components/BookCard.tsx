import React from 'react';
import { Link } from 'react-router-dom';
import { Book, SiteConfig } from '../types';
import { ArrowRight } from 'lucide-react';

interface BookCardProps {
  book: Book;
  config?: SiteConfig;
}

const BookCard: React.FC<BookCardProps> = ({ book, config }) => {
  const themeColor = config?.themeColor || '#f97316';
  const bookId = book._id || book.id;

  return (
    <div className="group flex flex-col bg-brand-dark rounded-xl overflow-hidden border border-neutral-800 transition-all duration-300 hover:shadow-lg"
         style={{ borderColor: 'rgba(38,38,38,1)' }}
         onMouseEnter={(e) => {
           e.currentTarget.style.borderColor = themeColor;
           e.currentTarget.style.boxShadow = `0 0 20px ${themeColor}20`;
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.borderColor = 'rgba(38,38,38,1)';
           e.currentTarget.style.boxShadow = 'none';
         }}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span 
             className="text-white text-xs font-bold uppercase tracking-wider px-2 py-1 rounded"
             style={{ backgroundColor: themeColor }}
           >
             {book.category}
           </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
           <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: themeColor }}>{book.author}</p>
           <h3 className="font-serif text-xl text-white leading-tight transition-colors group-hover:text-white">
             {book.title}
           </h3>
        </div>
        
        <p className="text-neutral-400 text-sm line-clamp-3 mb-6 flex-grow">
          {book.summary}
        </p>

        <Link 
          to={`/blog/${bookId}`} 
          className="inline-flex items-center text-sm font-semibold text-white transition-colors mt-auto group-hover:underline"
          style={{ textDecorationColor: themeColor }}
        >
          Đọc Bài Viết <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default BookCard;