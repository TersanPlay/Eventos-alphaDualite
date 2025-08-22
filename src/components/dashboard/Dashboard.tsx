import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Calendar, TrendingUp, CheckCircle, Clock, XCircle, FileText, Users } from 'lucide-react';
import StatCard from './StatCard';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DashboardContext {
  setShowEventForm: (show: boolean) => void;
}

const Dashboard: React.FC = () => {
  const { setShowEventForm } = useOutletContext<DashboardContext>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events } = useData();

  const totalEvents = events.length;
  const eventsThisMonth = events.filter(event => {
    const eventDate = new Date(event.startDate);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;
  
  const completedEvents = events.filter(event => event.status === 'concluido').length;
  const inProgressEvents = events.filter(event => event.status === 'em_andamento').length;
  const canceledEvents = events.filter(event => event.status === 'cancelado').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral</h1>
        <p className="text-gray-600">Acompanhe o desempenho do sistema de eventos institucionais</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard
          title="Total de Eventos"
          value={totalEvents}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Eventos Este Mês"
          value={eventsThisMonth}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Eventos Concluídos"
          value={completedEvents}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Em Andamento"
          value={inProgressEvents}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Cancelados"
          value={canceledEvents}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowEventForm(true)}
            className="flex items-center justify-center space-x-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg py-3 px-4 transition-colors"
          >
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-indigo-700">Novo Evento</span>
          </button>
          <button 
            onClick={() => navigate('/app/reports')}
            className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg py-3 px-4 transition-colors"
          >
            <FileText className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700">Gerar Relatório</span>
          </button>
          {user?.role === 'admin' && (
            <button 
              onClick={() => navigate('/app/admin')}
              className="flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg py-3 px-4 transition-colors"
            >
              <Users className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-700">Gerenciar Usuários</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
