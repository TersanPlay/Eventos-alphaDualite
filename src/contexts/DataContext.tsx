import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';
import { Event, User, Notification, AuditLog } from '../types';
import { useAuth } from './AuthContext';
import { 
  generateMockEvents, 
  generateMockNotifications, 
  generateMockAuditLogs,
  mockUsers as initialUsers
} from '../utils/mockData';

interface DataContextType {
  events: Event[];
  users: User[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'changes'>) => void;
  updateEvent: (updatedEvent: Event) => void;
  deleteEvent: (eventId: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: string) => void;
  updateNotification: (notificationId: string, updates: Partial<Notification>) => void;
  deleteNotification: (notificationId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { user: currentUser, updateCurrentUser } = useAuth();
  const [events, setEvents] = useState<Event[]>(() => generateMockEvents());
  const [users, setUsers] = useState<User[]>(() => initialUsers);
  const [notifications, setNotifications] = useState<Notification[]>(() => generateMockNotifications());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => generateMockAuditLogs());

  const addAuditLog = useCallback((action: string, details: string) => {
    if (!currentUser) return;
    const newLog: AuditLog = {
      id: faker.string.uuid(),
      timestamp: new Date(),
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, [currentUser]);

  const addEvent = useCallback((eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'changes'>) => {
    const newEvent: Event = {
      ...eventData,
      id: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      changes: [],
    };
    setEvents(prev => [newEvent, ...prev]);
    addAuditLog('CRIOU EVENTO', `Evento: "${newEvent.title}"`);
  }, [addAuditLog]);

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? { ...updatedEvent, updatedAt: new Date(), version: e.version + 1 } : e));
    addAuditLog('EDITOU EVENTO', `Evento: "${updatedEvent.title}"`);
  }, [addAuditLog]);

  const deleteEvent = useCallback((eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      addAuditLog('EXCLUIU EVENTO', `Evento: "${eventToDelete.title}"`);
    }
  }, [events, addAuditLog]);

  const addUser = useCallback((userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: faker.string.uuid(),
    };
    setUsers(prev => [newUser, ...prev]);
    addAuditLog('CRIOU USUÁRIO', `Usuário: "${newUser.name}"`);
  }, [addAuditLog]);

  const updateUser = useCallback((updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (updatedUser.id === currentUser?.id) {
        updateCurrentUser(updatedUser);
    }
    addAuditLog('EDITOU USUÁRIO', `Usuário: "${updatedUser.name}"`);
  }, [addAuditLog, currentUser, updateCurrentUser]);

  const deleteUser = useCallback((userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      addAuditLog('EXCLUIU USUÁRIO', `Usuário: "${userToDelete.name}"`);
    }
  }, [users, addAuditLog]);
  
  const updateNotification = useCallback((notificationId: string, updates: Partial<Notification>) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, ...updates } : n));
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const value = useMemo(() => ({
    events,
    users,
    notifications,
    auditLogs,
    addEvent,
    updateEvent,
    deleteEvent,
    addUser,
    updateUser,
    deleteUser,
    updateNotification,
    deleteNotification,
  }), [
    events, users, notifications, auditLogs, 
    addEvent, updateEvent, deleteEvent, 
    addUser, updateUser, deleteUser, 
    updateNotification, deleteNotification
  ]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
