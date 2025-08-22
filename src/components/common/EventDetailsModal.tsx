import React from 'react';
import { Event } from '../../types';
import Modal from './Modal';
import { Calendar, Clock, MapPin, Users, FileText, Tag, Info, Building, UserCircle, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { eventTypes, eventLocations } from '../../utils/mockData';

interface EventDetailsModalProps {
  event: Event | null;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const getStatusInfo = (status: string) => {
    const info = {
      rascunho: { label: 'Rascunho', color: 'bg-gray-100 text-gray-800' },
      agendado: { label: 'Agendado', color: 'bg-blue-100 text-blue-800' },
      em_andamento: { label: 'Em Andamento', color: 'bg-yellow-100 text-yellow-800' },
      concluido: { label: 'Concluído', color: 'bg-green-100 text-green-800' },
      cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-800' }
    };
    return info[status as keyof typeof info] || info.rascunho;
  };

  const statusInfo = getStatusInfo(event.status);

  return (
    <Modal isOpen={!!event} onClose={onClose} title="Detalhes do Evento" size="xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
          <div className="flex items-center space-x-4 mt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
            <span className="text-sm text-gray-600 capitalize">{event.modality}</span>
          </div>
        </div>

        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Data e Hora</p>
              <p className="text-gray-600">{format(new Date(event.startDate), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
              <p className="text-gray-600">
                <Clock className="w-4 h-4 inline-block mr-1" />
                {format(new Date(event.startDate), 'HH:mm', { locale: ptBR })} - {format(new Date(event.endDate), 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Local</p>
              <p className="text-gray-600">{eventLocations[event.location]}</p>
              {event.locationDetails && <p className="text-gray-500 text-xs">({event.locationDetails})</p>}
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Tag className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Tipo de Evento</p>
              <p className="text-gray-600">{eventTypes[event.type]}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Building className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Setor Responsável</p>
              <p className="text-gray-600">{event.sector}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <UserCircle className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Organizador</p>
              <p className="text-gray-600">{event.responsible}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center"><Info className="w-5 h-5 mr-2" />Descrição</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">{event.description}</p>
        </div>

        {/* Participants */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center"><Users className="w-5 h-5 mr-2" />Participantes ({event.participants.length})</h4>
          <div className="max-h-40 overflow-y-auto border rounded-lg">
            <ul className="divide-y">
              {event.participants.map(p => (
                <li key={p.id} className="p-3 text-sm flex justify-between items-center">
                  <span>{p.name}</span>
                  <span className="text-xs capitalize bg-gray-100 px-2 py-1 rounded-full">{p.role.replace('_', ' ')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Documents */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center"><Paperclip className="w-5 h-5 mr-2" />Documentos Anexados</h4>
          <div className="space-y-2">
            {event.documents.map(doc => (
              <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border transition-colors">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-gray-800 font-medium">{doc.name}</span>
                <span className="text-xs text-gray-500">({(doc.size / 1024 / 1024).toFixed(2)} MB)</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;
