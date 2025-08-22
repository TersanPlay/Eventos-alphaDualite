import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  Home, 
  Users, 
  Settings, 
  FileText, 
  Bell, 
  BarChart3,
  Shield,
  Archive
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: Home, path: '/app/dashboard' },
    { id: 'calendar', label: 'Calendário', icon: Calendar, path: '/app/calendar' },
    { id: 'events', label: 'Meus Eventos', icon: FileText, path: '/app/events' },
    { id: 'participants', label: 'Participantes', icon: Users, path: '/app/participants' },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, path: '/app/reports' },
    { id: 'notifications', label: 'Notificações', icon: Bell, path: '/app/notifications' },
    ...(user?.role === 'admin' ? [
      { id: 'admin', label: 'Administração', icon: Shield, path: '/app/admin' },
      { id: 'audit', label: 'Auditoria', icon: Archive, path: '/app/audit' }
    ] : []),
  ];

  const settingsItem = { id: 'settings', label: 'Configurações', icon: Settings, path: '/app/settings' };

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Eventos</h1>
            <p className="text-xs text-gray-500">Sistema Institucional</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <NavLink
          to={settingsItem.path}
          className={({ isActive }) =>
            `w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-4 ${
              isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
          }
        >
          <Settings className="w-5 h-5 mr-3" />
          {settingsItem.label}
        </NavLink>

        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.sector}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
