import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Edit, Trash2, Eye, PlusCircle, CalendarOff } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';
import { eventTypes, eventLocations } from '../../utils/mockData';
import Modal from '../common/Modal';
import EventDetailsModal from '../common/EventDetailsModal';

interface EventListContext {
  handleNewEventClick: () => void;
  handleEditEvent: (event: Event) => void;
}

const EventList: React.FC = () => {
  const { handleNewEventClick, handleEditEvent } = useOutletContext<EventListContext>();
  const { user } = useAuth();
  const { events, deleteEvent } = useData();
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  const userEvents = events.filter(event => event.sector === user?.sector);

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

  const handleDeleteConfirm = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      setEventToDelete(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Eventos</h1>
            <p className="text-gray-600">Gerencie os eventos do seu setor</p>
          </div>
          <button
            onClick={handleNewEventClick}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Novo Evento</span>
          </button>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {userEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{eventTypes[event.type]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{format(new Date(event.startDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{eventLocations[event.location]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                          {getStatusLabel(event.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button onClick={() => setViewingEvent(event)} className="text-indigo-600 hover:text-indigo-900 transition-colors" title="Visualizar"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => handleEditEvent(event)} className="text-blue-600 hover:text-blue-900 transition-colors" title="Editar"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setEventToDelete(event)} className="text-red-600 hover:text-red-900 transition-colors" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-6">
              <CalendarOff className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum evento encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Você ainda não criou nenhum evento para o seu setor.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleNewEventClick}
                  className="flex items-center mx-auto space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Criar Primeiro Evento</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!eventToDelete}
        onClose={() => setEventToDelete(null)}
        title="Confirmar Exclusão"
        size="sm"
        footer={
          <>
            <button onClick={() => setEventToDelete(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Excluir
            </button>
          </>
        }
      >
        <p>Você tem certeza que deseja excluir o evento "<strong>{eventToDelete?.title}</strong>"? Esta ação não pode ser desfeita.</p>
      </Modal>

      <EventDetailsModal event={viewingEvent} onClose={() => setViewingEvent(null)} />
    </>
  );
};

export default EventList;
