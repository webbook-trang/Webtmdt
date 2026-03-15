import React from 'react';
import { Mail, Instagram, Youtube, Heart } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="bg-brand-dark border-t border-neutral-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-white">{config.siteName}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Nơi lưu giữ những câu chuyện về sự trưởng thành và khám phá bản thân, qua từng trang sách.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 
              className="font-medium tracking-wide uppercase text-xs"
              style={{ color: config.themeColor }}
            >
              Liên Hệ
            </h4>
            <div className="flex flex-col space-y-2 items-center md:items-start text-neutral-300 text-sm">
              <a href="mailto:kate@example.com" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail size={16} />
                <span>buithutrang.ptit@gmail.com</span>
              </a>
              <span className="flex items-center space-x-2">
                 <span>Hà Nội, Việt Nam</span>
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
             <h4 
               className="font-medium tracking-wide uppercase text-xs"
               style={{ color: config.themeColor }}
             >
               Theo Dõi Mình
             </h4>
             <div className="flex justify-center md:justify-start space-x-6">
                <a href="https://www.instagram.com/imkate.mz/" className="text-neutral-400 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="/youtube" className="text-neutral-400 hover:text-white transition-colors">
                  <Youtube size={24} />
                </a>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-xs">
          <p>&copy; {new Date().getFullYear()} {config.siteName}. Bảo lưu mọi quyền.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Được làm bằng <Heart size={12} className="mx-1" style={{ color: config.themeColor }} /> dành cho người yêu sách.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;