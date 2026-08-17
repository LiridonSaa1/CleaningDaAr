export type Language = 'de' | 'en';

export type ServiceCategory = 'all' | 'commercial' | 'residential' | 'special' | 'construction';

export interface ServiceItem {
  id: string;
  title: string;
  titleDe?: string;
  titleEn?: string;
  category: 'commercial' | 'residential' | 'special' | 'construction';
  shortDescription: string;
  shortDescriptionDe?: string;
  shortDescriptionEn?: string;
  fullDescription: string;
  iconName: string;
  badge?: string;
  popular?: boolean;
  image: string;
  priceFrom: string;
  frequencyRecommendation: string;
  checklist: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  avatar: string;
  date: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  metrics: { label: string; value: string };
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionDe?: string;
  questionEn?: string;
  answer: string;
  answerDe?: string;
  answerEn?: string;
  category: 'general' | 'pricing' | 'process' | 'security';
}

export interface CalculatorState {
  objectType: 'office' | 'residential' | 'staircase' | 'glass' | 'construction' | 'practice';
  squareMeters: number;
  frequency: 'once' | 'weekly' | 'twice_weekly' | 'biweekly' | 'monthly';
  addGlass: boolean;
  addDeepSanitizing: boolean;
  addCarpet: boolean;
  addKeyService: boolean;
  postalCode: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  squareMeters: string;
  frequency: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  message: string;
  agreedToPrivacy: boolean;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  street: string;
  city: string;
  postalCode: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  hours: string;
  coverageArea: string[];
}
