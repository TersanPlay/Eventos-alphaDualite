import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, BarChart3, Users, Shield, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: "Agenda Centralizada",
      description: "Visualize todos os eventos em um calendário interativo com filtros avançados."
    },
    {
      icon: Users,
      title: "Gestão de Participantes",
      description: "Controle convidados, inscrições e check-in de forma simples e eficiente."
    },
    {
      icon: BarChart3,
      title: "Relatórios e Análises",
      description: "Gere relatórios detalhados e acompanhe KPIs em tempo real para tomar decisões."
    },
    {
      icon: Shield,
      title: "Segurança e Conformidade",
      description: "Sistema robusto com controle de acesso por perfil e trilhas de auditoria completas."
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-7 h-7 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">EventosGov</span>
          </div>
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Acessar Sistema
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Gestão de Eventos Institucionais,
            <br />
            <span className="text-indigo-600">Simplificada e Transparente.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Centralize, organize e audite todos os eventos do seu órgão público com uma plataforma digital completa, projetada para máxima eficiência e conformidade.
          </p>
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
              Começar Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Tudo que você precisa em um só lugar</h2>
              <p className="mt-4 text-gray-600">Funcionalidades pensadas para a gestão pública moderna.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <blockquote className="max-w-3xl mx-auto">
              <p className="text-2xl font-medium text-gray-900">
                "A implementação do sistema transformou nossa gestão de eventos. Ganhamos em agilidade, transparência e, principalmente, em controle sobre os processos. É uma ferramenta indispensável."
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-gray-800">Maria Silva</p>
                <p className="text-gray-600">Chefe de Gabinete, Secretaria de Planejamento</p>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white">
          <div className="container mx-auto px-6 py-20">
            <div className="bg-indigo-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold">Pronto para Modernizar a Gestão de Eventos?</h2>
              <p className="mt-4 max-w-2xl mx-auto">
                Acesse o sistema com suas credenciais institucionais e descubra uma nova forma de gerenciar eventos públicos.
              </p>
              <div className="mt-8">
                <Link
                  to="/login"
                  className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                  Acessar o Sistema
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-8 text-center">
          <p>&copy; {new Date().getFullYear()} EventosGov. Todos os direitos reservados.</p>
          <p className="text-sm text-gray-400 mt-2">Desenvolvido para a Governança Digital do Setor Público.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
