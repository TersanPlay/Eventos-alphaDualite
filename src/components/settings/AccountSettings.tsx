import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';

const AccountSettings: React.FC = () => {
  const { user } = useAuth();
  const { updateUser } = useData();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    
    if (newPassword && newPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
    };

    updateUser(updatedUser);

    alert("Perfil atualizado com sucesso!");
    // In a real app, you would also handle password change logic
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações da Conta</h1>
        <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-4">Informações do Perfil</h3>
        
        <div className="flex items-center space-x-6 mb-8">
          <img className="h-24 w-24 rounded-full" src={user.avatar} alt="Avatar do usuário" />
          <div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">Alterar Foto</button>
            <p className="text-xs text-gray-500 mt-2">JPG, GIF ou PNG. Tamanho máximo de 5MB.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-4">Alterar Senha</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
          <Save className="w-5 h-5" />
          <span>Salvar Alterações</span>
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
