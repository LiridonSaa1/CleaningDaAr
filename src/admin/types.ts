export type AdminTab = 'dashboard' | 'messages' | 'quotes' | 'services' | 'projects' | 'reviews' | 'settings' | 'about';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}
