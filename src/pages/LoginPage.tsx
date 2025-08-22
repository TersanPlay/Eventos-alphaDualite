import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, LogIn, Mail, Lock, Loader2, Info } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Form Section */}
        <div className="p-8 md:p-12">
          <div className="flex items-center space-x-3 mb-8">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">EventosGov</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Acesse sua conta</h2>
          <p className="text-gray-600 mt-2 mb-6">Bem-vindo(a) de volta! Insira suas credenciais.</p>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-sm">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-indigo-800 mb-1">Credenciais de Demonstração</h4>
                <p className="text-gray-700">Use os seguintes dados para acessar:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li>
                    <strong>Admin:</strong> <code className="bg-indigo-100 text-indigo-800 px-1 py-0.5 rounded">maria.santos@orgao.gov.br</code>
                  </li>
                  <li>
                    <strong>Organizador:</strong> <code className="bg-indigo-100 text-indigo-800 px-1 py-0.5 rounded">joao.costa@orgao.gov.br</code>
                  </li>
                </ul>
                <p className="mt-2 text-xs text-gray-500">Qualquer senha funcionará para esta demonstração.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Institucional
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="seu.nome@orgao.gov.br"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-indigo-400"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block relative">
          <img
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop"
            alt="Pessoas em um evento institucional"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-800 bg-opacity-60 flex flex-col justify-end p-12 text-white">
            <h3 className="text-3xl font-bold leading-snug">Eficiência e Transparência na Gestão de Eventos Públicos</h3>
            <p className="mt-4 text-indigo-100">Nossa plataforma centraliza todas as etapas, da criação à auditoria, garantindo conformidade e otimização de recursos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
