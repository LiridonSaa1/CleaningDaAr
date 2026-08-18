import React, { useState, useEffect, useCallback } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminContactMessages } from './pages/AdminContactMessages';
import { AdminQuoteRequests } from './pages/AdminQuoteRequests';
import { AdminReviews } from './pages/AdminReviews';
import { AdminSettings } from './pages/AdminSettings';
import { AdminServices } from './pages/AdminServices';
import { AdminProjects } from './pages/AdminProjects';
import { AdminTab } from './types';
import { 
  ContactMessageItem, 
  QuoteRequestItem, 
  ReviewItem, 
  ServiceDbItem,
  ProjectDbItem,
  getContactMessages, 
  getQuoteRequests, 
  getReviews,
  getServices,
  getProjects
} from '../lib/supabase';

interface AdminAppProps {
  onGoToWebsite: () => void;
}

const AdminContent: React.FC<AdminAppProps> = ({ onGoToWebsite }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Database Data States
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [services, setServices] = useState<ServiceDbItem[]>([]);
  const [projects, setProjects] = useState<ProjectDbItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Selected item for modal navigation from dashboard
  const [selectedMessageForModal, setSelectedMessageForModal] = useState<ContactMessageItem | null>(null);
  const [selectedQuoteForModal, setSelectedQuoteForModal] = useState<QuoteRequestItem | null>(null);

  const fetchAllData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [msgData, quoteData, revData, srvData, projData] = await Promise.all([
        getContactMessages(),
        getQuoteRequests(),
        getReviews(false),
        getServices(),
        getProjects(true)
      ]);

      setMessages(msgData);
      setQuotes(quoteData);
      setReviews(revData);
      setServices(srvData);
      setProjects(projData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated, fetchAllData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B1838] flex items-center justify-center text-white text-sm font-sans">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Admin-Sitzung wird geladen...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onGoToWebsite={onGoToWebsite} />;
  }

  const unreadMessagesCount = messages.filter(m => m.status === 'new').length;
  const newQuotesCount = quotes.filter(q => q.status === 'new').length;
  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  const handleOpenMessageFromDashboard = (msg: ContactMessageItem) => {
    setSelectedMessageForModal(msg);
    setActiveTab('messages');
  };

  const handleOpenQuoteFromDashboard = (quote: QuoteRequestItem) => {
    setSelectedQuoteForModal(quote);
    setActiveTab('quotes');
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onGoToWebsite={onGoToWebsite}
      unreadMessagesCount={unreadMessagesCount}
      newQuotesCount={newQuotesCount}
      pendingReviewsCount={pendingReviewsCount}
    >
      {activeTab === 'dashboard' && (
        <AdminDashboard
          messages={messages}
          quotes={quotes}
          reviews={reviews}
          setActiveTab={setActiveTab}
          onOpenMessage={handleOpenMessageFromDashboard}
          onOpenQuote={handleOpenQuoteFromDashboard}
        />
      )}

      {activeTab === 'messages' && (
        <AdminContactMessages
          messages={messages}
          refreshData={fetchAllData}
          selectedMessageForModal={selectedMessageForModal}
        />
      )}

      {activeTab === 'quotes' && (
        <AdminQuoteRequests
          quotes={quotes}
          refreshData={fetchAllData}
          selectedQuoteForModal={selectedQuoteForModal}
        />
      )}

      {activeTab === 'services' && (
        <AdminServices
          services={services}
          refreshData={fetchAllData}
        />
      )}

      {activeTab === 'projects' && (
        <AdminProjects
          projects={projects}
          refreshData={fetchAllData}
        />
      )}

      {activeTab === 'reviews' && (
        <AdminReviews
          reviews={reviews}
          refreshData={fetchAllData}
        />
      )}

      {activeTab === 'settings' && (
        <AdminSettings
          onSettingsUpdated={fetchAllData}
        />
      )}
    </AdminLayout>
  );
};

export const AdminApp: React.FC<AdminAppProps> = ({ onGoToWebsite }) => {
  return (
    <AdminAuthProvider>
      <AdminContent onGoToWebsite={onGoToWebsite} />
    </AdminAuthProvider>
  );
};
