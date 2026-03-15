import React from 'react';
import { Link } from 'react-router-dom';
import { Book, SiteConfig } from '../types';
import BookCard from '../components/BookCard';
import { ArrowRight, BookOpenCheck, Star, Coffee } from 'lucide-react';

interface HomeProps {
  books: Book[];
  config: SiteConfig;
}

const Home: React.FC<HomeProps> = ({ books, config }) => {
  const featuredBooks = books.filter(b => b.isFeatured).slice(0, 3);
  const recentBooks = books.slice(0, 4);

  return (
    <div className="min-h-screen">
      
      {/* Cover Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={config.heroImageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-brand-black"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-[fadeIn_1s_ease-out]">
          <p className="text-lg md:text-xl text-neutral-300 font-light tracking-widest uppercase mb-4 drop-shadow-md">
            {config.heroTopText}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
            {config.heroMainText}
          </h1>
          <p className="text-lg md:text-2xl text-neutral-200 font-light leading-relaxed mb-10 max-w-3xl mx-auto drop-shadow-md italic">
            “{config.heroSubText}”
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/blog" 
              className="px-8 py-4 text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: config.themeColor }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(110%)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(100%)'}
            >
              Explore the Blog
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-transparent border border-white/30 hover:border-white hover:bg-white/5 text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300"
            >
              Meet Kate
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / Philosophy Section */}
      <section className="py-24 bg-brand-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="bg-brand-dark p-8 rounded-2xl border border-neutral-800 text-center hover:border-opacity-100 transition-colors"
                  style={{ borderColor: 'rgba(64,64,64,0.5)' }}
             >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${config.themeColor}15`, color: config.themeColor }}
                >
                  <BookOpenCheck size={32} />
                </div>
                <h3 className="font-serif text-xl text-white mb-4">Tuyển Tập Chọn Lọc</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Mỗi cuốn sách đều được lựa chọn kỹ lưỡng. Mình tập trung vào chất lượng hơn số lượng, đảm bảo mỗi gợi ý đều mang lại giá trị.
                </p>
             </div>
             <div className="bg-brand-dark p-8 rounded-2xl border border-neutral-800 text-center hover:border-opacity-100 transition-colors">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${config.themeColor}15`, color: config.themeColor }}
                >
                  <Star size={32} />
                </div>
                <h3 className="font-serif text-xl text-white mb-4">Review Chân Thực</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Những suy nghĩ khách quan về văn học. Mình khám phá những ý nghĩa sâu sắc hơn và cách chúng áp dụng vào cuộc sống hiện đại.
                </p>
             </div>
             <div className="bg-brand-dark p-8 rounded-2xl border border-neutral-800 text-center hover:border-opacity-100 transition-colors">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${config.themeColor}15`, color: config.themeColor }}
                >
                  <Coffee size={32} />
                </div>
                <h3 className="font-serif text-xl text-white mb-4">Phương pháp đọc hiệu quả</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Tham gia cộng đồng của những người đọc chậm và nghĩ sâu. Hãy cùng thảo luận về những ý tưởng quan trọng.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      {featuredBooks.length > 0 && (
        <section className="py-24 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">Sách Nổi Bật</h2>
                <div className="h-1 w-20" style={{ backgroundColor: config.themeColor }}></div>
              </div>
              <Link 
                to="/blog" 
                className="hidden md:flex items-center hover:text-white transition-colors text-sm font-semibold tracking-wide"
                style={{ color: config.themeColor }}
              >
                Xem Tất Cả <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBooks.map(book => (
                <BookCard key={book._id || book.id} book={book} config={config} />
              ))}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link 
                to="/blog" 
                className="inline-block px-6 py-3 border rounded-full text-white transition-colors"
                style={{ borderColor: config.themeColor, color: config.themeColor }}
              >
                Xem Tất Cả
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Additions (Text Only Style) */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="font-serif text-3xl text-center text-white mb-16">
             Mới Lên Kệ
           </h2>
           <div className="space-y-8">
             {recentBooks.map((book, idx) => (
               <Link to={`/blog/${book._id || book.id}`} key={book._id || book.id} className="group flex items-center justify-between border-b border-neutral-800 pb-8 hover:border-neutral-600 transition-colors">
                 <div className="flex items-center space-x-6">
                    <span className="text-sm font-mono opacity-50" style={{ color: config.themeColor }}>0{idx + 1}</span>
                    <div>
                      <h3 className="text-xl md:text-2xl text-white font-serif transition-colors"
                          onMouseEnter={(e) => e.currentTarget.style.color = config.themeColor}
                          onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >{book.title}</h3>
                      <p className="text-neutral-500 text-sm mt-1">tác giả {book.author}</p>
                    </div>
                 </div>
                 <div className="hidden md:block">
                    <span className="text-neutral-500 text-sm uppercase tracking-wider group-hover:text-white transition-colors">{book.category}</span>
                 </div>
               </Link>
             ))}
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;