export enum BookCategory {
  SelfHelp = "Phát triển bản thân",
  Literature = "Văn học",
  EconomicsBusiness = "Kinh tế & Kinh doanh",
  // Philosophy = "Triết học"
}

export interface Book {
  _id?: string; // MongoDB sử dụng _id
  id?: string;  // Giữ lại để tương thích ngược
  title: string;
  author: string;
  category: BookCategory;
  coverUrl: string;
  summary: string;
  content: string;
  isFeatured: boolean;
  dateAdded: string;
}

export interface SiteConfig {
  _id?: string;
  siteName: string;
  heroTopText: string;
  heroMainText: string;
  heroSubText: string;
  heroImageUrl: string;
  themeColor: string;
}

export interface AppState {
  books: Book[];
  config: SiteConfig;
  isLoading: boolean;
  error: string | null;
}