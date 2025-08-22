import React, { useState } from 'react';
import { Edit, Trash2, UserPlus, Shield, User, Users2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { User as UserType } from '../../types';
import Modal from '../common/Modal';
import UserForm from './UserForm';

const UserManagement: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useData();
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const handleNewUserClick = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: UserType) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleCloseForm = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleUserSave = (userData: any) => {
    if (editingUser) {
      updateUser({ ...editingUser, ...userData });
    } else {
      addUser({ ...userData, avatar: `https://ui-avatars.com/api/?name=${userData.name.replace(' ', '+')}&background=random` });
    }
    handleCloseForm();
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administração de Usuários</h1>
            <p className="text-gray-600">Gerencie usuários, perfis e permissões do sistema</p>
          </div>
          <button
            onClick={handleNewUserClick}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span>Novo Usuário</span>
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.sector}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                          {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : <User className="w-3 h-3 mr-1" />}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {user.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-900 transition-colors" title="Editar"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setUserToDelete(user)} className="text-red-600 hover:text-red-900 transition-colors" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-6">
              <Users2 className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Nenhum usuário encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Não há usuários cadastrados no sistema.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleNewUserClick}
                  className="flex items-center mx-auto space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Cadastrar Primeiro Usuário</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showUserForm && (
        <UserForm
          userToEdit={editingUser}
          onClose={handleCloseForm}
          onSave={handleUserSave}
        />
      )}

      <Modal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        title="Confirmar Exclusão"
        size="sm"
        footer={
          <>
            <button onClick={() => setUserToDelete(null)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Excluir
            </button>
          </>
        }
      >
        <p>Você tem certeza que deseja excluir o usuário "<strong>{userToDelete?.name}</strong>"? Esta ação não pode ser desfeita.</p>
      </Modal>
    </>
  );
};

export default UserManagement;
