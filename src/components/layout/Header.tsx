import React from 'react';
import { Bell, Search, LogOut, PlusCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockNotifications } from '../../utils/mockData';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onNewEventClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewEventClick }) => {
  const { user, logout } = useAuth();
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar eventos, participantes..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-96"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onNewEventClick}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Novo Evento</span>
          </button>
          
          <Link to="/app/notifications" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>

          <div className="flex items-center space-x-2">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            <button
              onClick={logout}
              className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
