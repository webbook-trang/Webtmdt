import React, { useState } from 'react';
import { Book, BookCategory, SiteConfig } from '../types';
import BookCard from '../components/BookCard';

interface BlogProps {
  books: Book[];
  config: SiteConfig;
}

const Blog: React.FC<BlogProps> = ({ books, config }) => {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | 'Tất cả'>('Tất cả');

  const categories = ['Tất cả', ...Object.values(BookCategory)];

  const filteredBooks = selectedCategory === 'Tất cả' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="font-serif text-5xl text-white mb-6">Khám Phá Blog Sách</h1>
        <p className="text-neutral-400 max-w-2xl text-lg">
          Đắm mình vào bộ sưu tập những suy ngẫm, tóm tắt và bình luận. Lọc theo thể loại để tìm cuốn sách tuyệt vời tiếp theo của bạn.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-20 z-40 bg-brand-black/95 backdrop-blur border-b border-neutral-800 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex space-x-8 py-4 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`text-sm font-medium uppercase tracking-widest pb-1 border-b-2 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-neutral-500 border-transparent hover:text-white'
                }`}
                style={{
                   borderColor: selectedCategory === category ? config.themeColor : 'transparent',
                   color: selectedCategory === category ? config.themeColor : undefined
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} config={config} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-xl">Chưa có bài viết nào trong danh mục này.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Blog;