import { Book, BookCategory, SiteConfig } from './types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "Read with Kate",
  heroTopText: "Welcome to my world",
  heroMainText: "Read with Kate",
  heroSubText: "Nơi lưu giữ những trang sách hay, những câu chuyện về sự trưởng thành và hành trình khám phá bản thân.",
  heroImageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2456&auto=format&fit=crop",
  themeColor: "#f97316" // Default Orange
};

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: BookCategory.SelfHelp,
    coverUrl: 'https://picsum.photos/seed/atomic/400/600',
    summary: 'Cách dễ dàng và đã được chứng minh để xây dựng thói quen tốt và phá bỏ thói quen xấu.',
    content: 'Atomic Habits cung cấp một khuôn khổ để cải thiện mỗi ngày. James Clear tiết lộ những chiến lược thực tế sẽ dạy bạn chính xác cách hình thành thói quen tốt, phá bỏ thói quen xấu và làm chủ những hành vi nhỏ dẫn đến kết quả vượt trội. Cuốn sách này là tài liệu phải đọc cho bất kỳ ai muốn tối ưu hóa cuộc sống của mình thông qua những thay đổi nhỏ, nhất quán.',
    isFeatured: true,
    dateAdded: '2023-10-15'
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: BookCategory.Literature,
    coverUrl: 'https://picsum.photos/seed/gatsby/400/600',
    summary: 'Câu chuyện về triệu phú bí ẩn Jay Gatsby và tình yêu của ông dành cho Daisy Buchanan xinh đẹp.',
    content: 'Lấy bối cảnh Thời đại Jazz trên Long Island, cuốn tiểu thuyết mô tả những tương tác của người kể chuyện với triệu phú bí ẩn Jay Gatsby và nỗi ám ảnh của Gatsby muốn tái hợp với người tình cũ, Daisy Buchanan. Nó khám phá các chủ đề về sự suy đồi, chủ nghĩa lý tưởng, sự chống lại thay đổi, biến động xã hội và sự dư thừa.',
    isFeatured: true,
    dateAdded: '2023-11-01'
  },
  {
    id: '3',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    category: BookCategory.EconomicsBusiness,
    coverUrl: 'https://picsum.photos/seed/thinking/400/600',
    summary: 'Cuốn sách bán chạy nhất giải thích hai hệ thống điều khiển cách chúng ta suy nghĩ.',
    content: 'Kahneman đưa chúng ta vào một chuyến tham quan đột phá về tâm trí và giải thích hai hệ thống điều khiển cách chúng ta suy nghĩ. Hệ thống 1 nhanh, trực quan và cảm xúc; Hệ thống 2 chậm hơn, cân nhắc hơn và logic hơn. Hiểu những hệ thống này có thể cải thiện khả năng ra quyết định của chúng ta trong kinh doanh và cuộc sống.',
    isFeatured: false,
    dateAdded: '2023-12-10'
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Explore Book Blog', path: '/blog' },
  { name: 'About Kate', path: '/about' },
  { name: 'YouTube', path: '/youtube' },
];