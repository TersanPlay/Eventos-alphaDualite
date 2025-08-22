import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData } from '../../contexts/DataContext';
import { Info, AlertTriangle, CheckCircle, XCircle, Trash2, Check } from 'lucide-react';

const NotificationCenter: React.FC = () => {
  const { notifications, updateNotification, deleteNotification } = useData();

  const getIcon = (type: string) => {
    switch(type) {
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Central de Notificações</h1>
        <p className="text-gray-600">Avisos, lembretes e atualizações do sistema</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <ul className="divide-y divide-gray-200">
          {notifications.map(notification => (
            <li key={notification.id} className={`p-4 flex items-start space-x-4 ${!notification.read ? 'bg-indigo-50' : 'bg-white'}`}>
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>{notification.title}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ptBR })}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
              <div className="flex items-center space-x-2">
                {!notification.read && (
                  <button onClick={() => updateNotification(notification.id, { read: true })} className="p-1 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-md" title="Marcar como lida">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => deleteNotification(notification.id)} className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md" title="Excluir">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationCenter;
