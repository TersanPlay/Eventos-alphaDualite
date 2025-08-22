import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, Search, Download, FileText, FileUp } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData } from '../../contexts/DataContext';
import { Event, EventType } from '../../types';
import { eventTypes, eventLocations, sectors } from '../../utils/mockData';
import { useExport } from '../../hooks/useExport';
import EventDetailsModal from '../common/EventDetailsModal';

const CalendarView: React.FC = () => {
  const { events } = useData();
  const { exportToPDF, exportToICS } = useExport();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'list'>('month');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    sector: '',
    status: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || event.type === filters.type;
    const matchesLocation = !filters.location || event.location === filters.location;
    const matchesSector = !filters.sector || event.sector === filters.sector;
    const matchesStatus = !filters.status || event.status === filters.status;
    
    return matchesSearch && matchesType && matchesLocation && matchesSector && matchesStatus;
  });

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => 
      isSameDay(new Date(event.startDate), day)
    );
  };

  const getEventTypeColor = (type: EventType) => {
    const colors = {
      reuniao: 'bg-blue-500',
      audiencia_publica: 'bg-purple-500',
      sessao_plenaria: 'bg-red-500',
      palestra: 'bg-green-500',
      workshop: 'bg-yellow-500',
      seminario: 'bg-indigo-500',
      congresso: 'bg-pink-500',
      curso_capacitacao: 'bg-teal-500',
      mesa_redonda: 'bg-orange-500',
      debate: 'bg-cyan-500',
      conferencia: 'bg-lime-500',
      encontro_tematico: 'bg-emerald-500',
      assembleia: 'bg-violet-500',
      visita_tecnica: 'bg-sky-500',
      cerimonia_oficial: 'bg-rose-500',
      lancamento_projeto: 'bg-amber-500',
      coletiva_imprensa: 'bg-fuchsia-500',
      atividade_cultural: 'bg-slate-500',
      atividade_comunitaria: 'bg-zinc-500',
      outros: 'bg-gray-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const MonthView = () => (
    <div className="grid grid-cols-7 gap-1">
      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
        <div key={day} className="p-2 text-center text-sm font-medium text-gray-700 bg-gray-50">
          {day}
        </div>
      ))}
      
      {monthDays.map(day => {
        const dayEvents = getEventsForDay(day);
        const isCurrentMonth = isSameMonth(day, currentDate);
        const isToday = isSameDay(day, new Date());
        
        return (
          <div 
            key={day.toISOString()} 
            className={`min-h-[120px] p-2 border border-gray-200 ${
              !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
            } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
          >
            <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : ''}`}>
              {format(day, 'd')}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map(event => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                  title={event.title}
                  onClick={() => setViewingEvent(event)}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{dayEvents.length - 3} mais
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4 p-4">
      {filteredEvents
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .map(event => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setViewingEvent(event)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <span className="text-xs text-gray-500">{eventTypes[event.type]}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{event.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>{format(new Date(event.startDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</span>
                  <span>{eventLocations[event.location]}</span>
                  <span>{event.sector}</span>
                  <span>{event.participants.length} participantes</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'agendado' ? 'bg-blue-100 text-blue-800' :
                  event.status === 'concluido' ? 'bg-green-100 text-green-800' :
                  event.status === 'cancelado' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status === 'agendado' ? 'Agendado' :
                   event.status === 'concluido' ? 'Concluído' :
                   event.status === 'cancelado' ? 'Cancelado' : 'Rascunho'}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendário de Eventos</h1>
            <p className="text-gray-600">Visualize e gerencie todos os eventos institucionais</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => exportToPDF(filteredEvents)} className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-colors">
              <FileText className="w-4 h-4" />
              <span>Exportar PDF</span>
            </button>
             <button onClick={() => exportToICS(filteredEvents)} className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-colors">
              <FileUp className="w-4 h-4" />
              <span>Exportar ICS</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todos os tipos</option>
              {Object.entries(eventTypes).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todos os locais</option>
              {Object.entries(eventLocations).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>

            <select
              value={filters.sector}
              onChange={(e) => setFilters({...filters, sector: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todos os setores</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Todos os status</option>
              <option value="rascunho">Rascunho</option>
              <option value="agendado">Agendado</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
            </h2>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                view === 'month' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Mês
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Lista
            </button>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {view === 'month' ? <MonthView /> : <ListView />}
        </div>
      </div>
      <EventDetailsModal event={viewingEvent} onClose={() => setViewingEvent(null)} />
    </>
  );
};

export default CalendarView;
