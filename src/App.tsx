import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import CalendarView from './components/calendar/CalendarView';
import EventList from './components/events/EventList';
import ParticipantManagement from './components/participants/ParticipantManagement';
import ReportGenerator from './components/reports/ReportGenerator';
import NotificationCenter from './components/notifications/NotificationCenter';
import UserManagement from './components/admin/UserManagement';
import AuditLog from './components/audit/AuditLog';
import AccountSettings from './components/settings/AccountSettings';

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/app" /> : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/app" /> : <LoginPage />} />
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="events" element={<EventList />} />
        <Route path="participants" element={<ParticipantManagement />} />
        <Route path="reports" element={<ReportGenerator />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="admin" element={<UserManagement />} />
        <Route path="audit" element={<AuditLog />} />
        <Route path="settings" element={<AccountSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
