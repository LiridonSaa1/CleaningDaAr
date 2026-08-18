export type AdminTab = 'dashboard' | 'messages' | 'quotes' | 'reviews' | 'settings';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}
