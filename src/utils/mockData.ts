import { faker } from '@faker-js/faker';
import { Event, EventType, EventLocation, User, Participant, Document, Notification, AuditLog } from '../types';

faker.locale = 'pt_BR';

export const eventTypes: Record<EventType, string> = {
  reuniao: 'Reunião',
  audiencia_publica: 'Audiência Pública',
  sessao_plenaria: 'Sessão Plenária',
  palestra: 'Palestra',
  workshop: 'Workshop',
  seminario: 'Seminário',
  congresso: 'Congresso',
  curso_capacitacao: 'Curso/Capacitação',
  mesa_redonda: 'Mesa-Redonda',
  debate: 'Debate',
  conferencia: 'Conferência',
  encontro_tematico: 'Encontro Temático',
  assembleia: 'Assembleia',
  visita_tecnica: 'Visita Técnica',
  cerimonia_oficial: 'Cerimônia Oficial',
  lancamento_projeto: 'Lançamento de Projeto',
  coletiva_imprensa: 'Coletiva de Imprensa',
  atividade_cultural: 'Atividade Cultural',
  atividade_comunitaria: 'Atividade Comunitária',
  outros: 'Outros'
};

export const eventLocations: Record<EventLocation, string> = {
  auditorio: 'Auditório',
  plenarinho: 'Plenarinho',
  presidencia: 'Presidência',
  gabinete: 'Gabinete',
  estacionamento_interno: 'Estacionamento Interno',
  estacionamento_externo: 'Estacionamento Externo',
  estacionamento_ambos: 'Estacionamento (Ambos)',
  outros: 'Outros'
};

export const sectors = [
  'Presidência',
  'Secretaria Executiva',
  'Assessoria Jurídica',
  'Gabinete da Presidência',
  'Diretoria Administrativa',
  'Diretoria Técnica',
  'Assessoria de Comunicação',
  'Recursos Humanos',
  'Tecnologia da Informação',
  'Planejamento Estratégico'
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Maria Silva Santos',
    email: 'maria.santos@orgao.gov.br',
    role: 'admin',
    sector: 'Presidência',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    status: 'ativo'
  },
  {
    id: '2',
    name: 'João Pereira Costa',
    email: 'joao.costa@orgao.gov.br',
    role: 'organizer',
    sector: 'Diretoria Técnica',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    status: 'ativo'
  },
  {
    id: '3',
    name: 'Ana Oliveira Lima',
    email: 'ana.lima@orgao.gov.br',
    role: 'organizer',
    sector: 'Assessoria de Comunicação',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    status: 'ativo'
  },
  {
    id: '4',
    name: 'Carlos Souza Almeida',
    email: 'carlos.almeida@orgao.gov.br',
    role: 'participant',
    sector: 'Recursos Humanos',
    status: 'inativo'
  },
];

export const mockUser = mockUsers[0]; // Logged in user is admin

// Generate mock participants
const generateParticipants = (count: number): Participant[] => {
  const roles: Participant['role'][] = ['palestrante', 'autoridade', 'servidor_apoio', 'convidado'];
  
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: faker.helpers.arrayElement(roles),
    confirmed: faker.datatype.boolean({ probability: 0.7 }),
    checkedIn: faker.datatype.boolean({ probability: 0.6 }),
    checkedInAt: faker.datatype.boolean({ probability: 0.6 }) ? faker.date.recent({ days: 7 }) : undefined
  }));
};

// Generate mock documents
const generateDocuments = (count: number): Document[] => {
  const docTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-excel'];
  const docNames = ['Pauta da Reunião', 'Ata de Reunião', 'Apresentação', 'Relatório', 'Convite Oficial'];
  
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(docNames) + '.pdf',
    type: faker.helpers.arrayElement(docTypes),
    size: faker.number.int({ min: 100000, max: 5000000 }),
    url: faker.internet.url(),
    uploadedAt: faker.date.recent({ days: 30 }),
    uploadedBy: faker.person.fullName()
  }));
};

// Generate mock events
export const generateMockEvents = (count: number = 50): Event[] => {
  const types = Object.keys(eventTypes) as EventType[];
  const locations = Object.keys(eventLocations) as EventLocation[];
  const statuses: Event['status'][] = ['rascunho', 'agendado', 'em_andamento', 'concluido', 'cancelado'];
  
  return Array.from({ length: count }, (_, index) => {
    const startDate = faker.date.between({
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      to: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)    // 60 days from now
    });
    
    const endDate = new Date(startDate.getTime() + faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000);
    const responsibleUser = faker.helpers.arrayElement(mockUsers);
    
    return {
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(2),
      type: faker.helpers.arrayElement(types),
      modality: faker.helpers.arrayElement(['presencial', 'virtual', 'hibrido']),
      startDate,
      endDate,
      location: faker.helpers.arrayElement(locations),
      locationDetails: faker.location.streetAddress(),
      responsibleId: responsibleUser.id,
      responsible: responsibleUser.name,
      sector: responsibleUser.sector,
      status: faker.helpers.arrayElement(statuses),
      participants: generateParticipants(faker.number.int({ min: 5, max: 50 })),
      documents: generateDocuments(faker.number.int({ min: 1, max: 5 })),
      isPublic: faker.datatype.boolean({ probability: 0.7 }),
      maxParticipants: faker.datatype.boolean({ probability: 0.5 }) ? faker.number.int({ min: 20, max: 200 }) : undefined,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      version: faker.number.int({ min: 1, max: 5 }),
      changes: []
    };
  });
};

export const mockEvents = generateMockEvents();

// Generate mock notifications
export const generateMockNotifications = (count: number = 10): Notification[] => {
  const types: Notification['type'][] = ['info', 'warning', 'success', 'error'];
  
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(5),
    message: faker.lorem.paragraph(1),
    type: faker.helpers.arrayElement(types),
    userId: mockUser.id,
    eventId: faker.helpers.maybe(() => faker.helpers.arrayElement(mockEvents).id),
    read: faker.datatype.boolean({ probability: 0.3 }),
    createdAt: faker.date.recent({ days: 7 })
  }));
};

export const mockNotifications = generateMockNotifications();

// Generate mock audit logs
export const generateMockAuditLogs = (count: number = 30): AuditLog[] => {
  const actions = [
    'CRIOU EVENTO',
    'EDITOU EVENTO',
    'CANCELOU EVENTO',
    'ADICIONOU PARTICIPANTE',
    'REMOVEU DOCUMENTO',
    'ATUALIZOU PERFIL',
    'LOGIN REALIZADO'
  ];

  return Array.from({ length: count }, () => {
    const user = faker.helpers.arrayElement(mockUsers);
    const event = faker.helpers.arrayElement(mockEvents);
    return {
      id: faker.string.uuid(),
      timestamp: faker.date.recent({ days: 15 }),
      userId: user.id,
      userName: user.name,
      action: faker.helpers.arrayElement(actions),
      details: `Evento: "${event.title}" (ID: ${event.id.substring(0, 8)})`
    };
  });
};

export const mockAuditLogs = generateMockAuditLogs();
