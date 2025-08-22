import React from 'react';
import { FileText, Download } from 'lucide-react';
import { eventTypes, sectors } from '../../utils/mockData';

const ReportGenerator: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-600">Gere relatórios e análises estatísticas dos eventos</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gerar Novo Relatório</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">Todos</option>
              {Object.entries(eventTypes).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">Todos</option>
              {sectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
            <FileText className="w-5 h-5" />
            <span>Gerar Relatório</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Relatórios Gerados</h3>
        <div className="text-center text-gray-500 py-8">
          <p>Nenhum relatório gerado recentemente.</p>
          <p className="text-sm">Use o formulário acima para criar um novo relatório.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
