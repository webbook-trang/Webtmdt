import React from 'react';
import { Youtube } from 'lucide-react';
import { SiteConfig } from '../types';

interface YoutubeProps {
    config: SiteConfig;
}

const YoutubePlaceholder: React.FC<YoutubeProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
      <div className="text-center">
        <Youtube size={80} className="mx-auto mb-6" style={{ color: config.themeColor }} />
        <h1 className="font-serif text-4xl text-white mb-4">Kênh Sắp Ra Mắt</h1>
        <p className="text-neutral-400 max-w-md mx-auto mb-8">
          Chúng mình đang quay các video review chuyên sâu và phỏng vấn tác giả. Hãy đăng ký để nhận thông báo mới nhất nhé!
        </p>
        <a 
          href="#" 
          className="inline-block bg-white text-brand-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-colors"
        >
          Ghé Thăm Kênh
        </a>
      </div>
    </div>
  );
};

export default YoutubePlaceholder;