import React from "react";
import { Instagram, Youtube } from "lucide-react";
import { SiteConfig } from "../types";

interface AboutProps {
  config: SiteConfig;
}

const About: React.FC<AboutProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Image */}
          <div className="w-full md:w-1/2 relative group">
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg opacity-20 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500"
              style={{ backgroundColor: config.themeColor }}
            ></div>
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
              alt="Kate reading"
              className="relative z-10 w-full rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="font-serif text-5xl text-white">Về Kate</h1>
            <div
              className="h-1 w-16"
              style={{ backgroundColor: config.themeColor }}
            ></div>

            <div className="text-neutral-300 space-y-4 leading-relaxed font-light text-lg">
              <p>
                Mình là Bùi Thu Trang, bạn bè thường gọi mình là Kate. Hành
                trình phát triển bản thân của mình bắt đầu từ năm 2023, khi mình
                tìm đến những cuốn sách về tâm lý học. Việc đọc sách không chỉ
                giúp mình hiểu người khác hơn, mà còn là cách để mình hiểu chính
                mình, học cách lắng nghe cảm xúc và trưởng thành từ bên trong.
              </p>
              <p>
                Cái tên Kate đến từ một câu chuyện rất đời thường trong gia
                đình. Vì thể chất khá yếu, mẹ mình hay gọi vui là Kate — một
                cách gọi rút gọn từ karate, như một lời nhắn nhủ dịu dàng rằng:
                dù nhỏ bé, mình vẫn cần mạnh mẽ và kiên cường theo cách của
                riêng mình.
              </p>
              <p>
                Mình tin rằng mỗi người đều có một hành trình riêng để trở nên
                tốt hơn từng ngày. Với mình, hành trình ấy được nuôi dưỡng từ
                sách, từ sự thấu hiểu tâm lý và từ những thay đổi nhỏ nhưng bền
                bỉ mỗi ngày.
              </p>
            </div>

            <div className="pt-8">
              <h3
                className="text-sm uppercase tracking-widest font-bold mb-4"
                style={{ color: config.themeColor }}
              >
                Kết nối với mình
              </h3>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-white bg-neutral-800 px-4 py-2 rounded-full hover:bg-neutral-700 transition-colors">
                  <Youtube size={18} /> <span>YouTube</span>
                </button>
                <button className="flex items-center space-x-2 text-white bg-neutral-800 px-4 py-2 rounded-full hover:bg-neutral-700 transition-colors">
                  <Instagram size={18} /> <span>Instagram</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
