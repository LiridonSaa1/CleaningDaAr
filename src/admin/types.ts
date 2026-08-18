export type AdminTab = 'dashboard' | 'messages' | 'quotes' | 'services' | 'projects' | 'reviews' | 'settings';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}
