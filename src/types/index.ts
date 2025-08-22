export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'organizer' | 'participant' | 'public';
  sector: string;
  avatar?: string;
  status: 'ativo' | 'inativo';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  modality: 'presencial' | 'virtual' | 'hibrido';
  startDate: Date;
  endDate: Date;
  location: EventLocation;
  locationDetails?: string;
  responsibleId: string;
  responsible: string;
  sector: string;
  status: 'rascunho' | 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';
  participants: Participant[];
  documents: Document[];
  isPublic: boolean;
  maxParticipants?: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  changes: EventChange[];
}

export type EventType = 
  | 'reuniao'
  | 'audiencia_publica'
  | 'sessao_plenaria'
  | 'palestra'
  | 'workshop'
  | 'seminario'
  | 'congresso'
  | 'curso_capacitacao'
  | 'mesa_redonda'
  | 'debate'
  | 'conferencia'
  | 'encontro_tematico'
  | 'assembleia'
  | 'visita_tecnica'
  | 'cerimonia_oficial'
  | 'lancamento_projeto'
  | 'coletiva_imprensa'
  | 'atividade_cultural'
  | 'atividade_comunitaria'
  | 'outros';

export type EventLocation = 
  | 'auditorio'
  | 'plenarinho'
  | 'presidencia'
  | 'gabinete'
  | 'estacionamento_interno'
  | 'estacionamento_externo'
  | 'estacionamento_ambos'
  | 'outros';

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'palestrante' | 'autoridade' | 'servidor_apoio' | 'convidado';
  confirmed: boolean;
  checkedIn: boolean;
  checkedInAt?: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface EventChange {
  id: string;
  field: string;
  oldValue: any;
  newValue: any;
  changedBy: string;
  changedAt: Date;
  reason?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  userId: string;
  eventId?: string;
  read: boolean;
  createdAt: Date;
}

export interface Report {
  period: {
    start: Date;
    end: Date;
  };
  totalEvents: number;
  eventsByType: Record<EventType, number>;
  eventsBySector: Record<string, number>;
  participationRate: number;
  averageParticipants: number;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  details: string;
}
