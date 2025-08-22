import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { User } from '../../types';
import { sectors } from '../../utils/mockData';

interface UserFormProps {
  userToEdit?: User | null;
  onClose: () => void;
  onSave: (userData: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ userToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'participant' as 'admin' | 'organizer' | 'participant',
    sector: '',
    status: 'ativo' as 'ativo' | 'inativo',
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
        sector: userToEdit.sector,
        status: userToEdit.status,
      });
    }
  }, [userToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{userToEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Nome do usuário" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="email@orgao.gov.br" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Perfil *</label>
              <select required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as any })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="participant">Participante</option>
                <option value="organizer">Organizador</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Setor *</label>
              <select required value={formData.sector} onChange={(e) => setFormData({ ...formData, sector: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="">Selecione o setor</option>
                {sectors.map(sector => (<option key={sector} value={sector}>{sector}</option>))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancelar</button>
            <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"><Save className="w-4 h-4" /><span>Salvar</span></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
