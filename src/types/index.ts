export interface Tool {
  id: string;
  name: string;
  cat: 'Yazı' | 'Görsel' | 'Kod' | 'Ses' | 'Video' | 'Analiz' | 'İş' | 'Eğitim';
  icon: string;
  color: string;
  rating: number;
  desc: string;
  longDesc: string;
  tag: 'Ücretsiz' | 'Freemium' | 'Ücretli';
  price: string;
  website: string;
  features: string[];
  pros: string[];
  cons: string[];
}

export type Lang = 'tr' | 'en';
export type Theme = 'dark' | 'light';

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}