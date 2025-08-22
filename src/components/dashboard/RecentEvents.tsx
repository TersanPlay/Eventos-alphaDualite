import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { mockEvents, eventTypes, eventLocations } from '../../utils/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const RecentEvents: React.FC = () => {
  const recentEvents = mockEvents
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    const colors = {
      rascunho: 'bg-gray-100 text-gray-800',
      agendado: 'bg-blue-100 text-blue-800',
      em_andamento: 'bg-yellow-100 text-yellow-800',
      concluido: 'bg-green-100 text-green-800',
      cancelado: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.rascunho;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      rascunho: 'Rascunho',
      agendado: 'Agendado',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Eventos Recentes</h3>
      <div className="space-y-4">
        {recentEvents.map((event) => (
          <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(event.startDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {eventLocations[event.location]}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {event.participants.length} participantes
                  </div>
                </div>
              </div>
              
              <div className="ml-4 flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {getStatusLabel(event.status)}
                </span>
                <span className="text-xs text-gray-500">{eventTypes[event.type]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEvents;
