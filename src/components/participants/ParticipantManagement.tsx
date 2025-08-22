import React, { useState, useMemo } from 'react';
import { Search, UserCheck, UserX } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import Pagination from '../common/Pagination';

const ITEMS_PER_PAGE = 10;

const ParticipantManagement: React.FC = () => {
  const { events } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allParticipants = useMemo(() => {
    return events.flatMap(event => 
      event.participants.map(p => ({ ...p, eventTitle: event.title, eventId: event.id }))
    );
  }, [events]);

  const filteredParticipants = useMemo(() => {
    return allParticipants.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allParticipants, searchTerm]);

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Participantes</h1>
        <p className="text-gray-600">Consulte e gerencie todos os participantes dos eventos</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou evento..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evento</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedParticipants.map((participant) => (
                <tr key={`${participant.id}-${participant.eventId}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{participant.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 truncate" title={participant.eventTitle}>{participant.eventTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 capitalize">{participant.role.replace('_', ' ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {participant.confirmed ? (
                      <span className="flex items-center text-sm text-green-600">
                        <UserCheck className="w-4 h-4 mr-1" /> Confirmado
                      </span>
                    ) : (
                      <span className="flex items-center text-sm text-yellow-600">
                        <UserX className="w-4 h-4 mr-1" /> Pendente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default ParticipantManagement;
