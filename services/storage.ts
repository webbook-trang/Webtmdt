import { Book, SiteConfig } from '../types';
import { INITIAL_BOOKS, DEFAULT_SITE_CONFIG } from '../constants';

const BOOKS_STORAGE_KEY = 'read_with_kate_data_v1';
const CONFIG_STORAGE_KEY = 'read_with_kate_config_v1';

export const getStoredBooks = (): Book[] => {
  const stored = localStorage.getItem(BOOKS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
    return INITIAL_BOOKS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse stored books", e);
    return INITIAL_BOOKS;
  }
};

export const saveBooks = (books: Book[]) => {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
};

export const getSiteConfig = (): SiteConfig => {
  const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
  if (!stored) {
    return DEFAULT_SITE_CONFIG;
  }
  try {
    const parsed = JSON.parse(stored);
    // Merge with default to ensure new keys exist if schema changes
    return { ...DEFAULT_SITE_CONFIG, ...parsed };
  } catch (e) {
    return DEFAULT_SITE_CONFIG;
  }
};

export const saveSiteConfig = (config: SiteConfig) => {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
};