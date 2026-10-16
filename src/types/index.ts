export interface LocalizedText {
  tr: string;
  en: string;
}

export interface LocalizedArray {
  tr: string[];
  en: string[];
}

export interface Tool {
  id: string;
  name: string;
  cat: 'Yazı' | 'Görsel' | 'Kod' | 'Ses' | 'Video' | 'Analiz' | 'İş' | 'Eğitim';
  icon: string;
  color: string;
  rating: number;
  desc: LocalizedText;
  longDesc: LocalizedText;
  tag: 'Ücretsiz' | 'Freemium' | 'Ücretli';
  price: string;
  website: string;
  features: LocalizedArray;
  pros: LocalizedArray;
  cons: LocalizedArray;
}

export type Lang = 'tr' | 'en';
export type Theme = 'dark' | 'light';

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}