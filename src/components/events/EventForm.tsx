import React, { useState, useEffect } from 'react';
import { Save, X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Event, EventType, EventLocation } from '../../types';
import { eventTypes, eventLocations, sectors } from '../../utils/mockData';
import { format } from 'date-fns';
import PdfViewerModal from '../common/PdfViewerModal';

interface EventFormProps {
  eventToEdit?: Event | null;
  onClose: () => void;
  onSave: (eventData: any) => void;
}

const EventForm: React.FC<EventFormProps> = ({ eventToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as EventType | '',
    modality: 'presencial' as 'presencial' | 'virtual' | 'hibrido',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '' as EventLocation | '',
    locationDetails: '',
    sector: '',
    maxParticipants: '',
    isPublic: true,
    documents: [] as File[]
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const pdfUrl = "http://alfresco.parauapebas.pa.leg.br:8080/share/s/FTIiuqNSQm6HNLfzWMpVQA";

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        title: eventToEdit.title,
        description: eventToEdit.description,
        type: eventToEdit.type,
        modality: eventToEdit.modality,
        startDate: format(new Date(eventToEdit.startDate), 'yyyy-MM-dd'),
        startTime: format(new Date(eventToEdit.startDate), 'HH:mm'),
        endDate: eventToEdit.endDate ? format(new Date(eventToEdit.endDate), 'yyyy-MM-dd') : '',
        endTime: eventToEdit.endDate ? format(new Date(eventToEdit.endDate), 'HH:mm') : '',
        location: eventToEdit.location,
        locationDetails: eventToEdit.locationDetails || '',
        sector: eventToEdit.sector,
        maxParticipants: eventToEdit.maxParticipants?.toString() || '',
        isPublic: eventToEdit.isPublic,
        documents: []
      });
      setTermsAccepted(true);
    }
  }, [eventToEdit]);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setIsPdfModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Você deve aceitar o termo de responsabilidade para continuar.');
      return;
    }
    
    const combinedStartDate = new Date(`${formData.startDate}T${formData.startTime}`);
    const combinedEndDate = formData.endDate && formData.endTime ? new Date(`${formData.endDate}T${formData.endTime}`) : combinedStartDate;

    const dataToSave = {
      ...formData,
      startDate: combinedStartDate,
      endDate: combinedEndDate,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants, 10) : undefined,
    };

    onSave(dataToSave);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.ms-excel'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;
      return isValidType && isValidSize;
    });
    
    setFormData({ ...formData, documents: [...formData.documents, ...validFiles] });
  };

  const removeDocument = (index: number) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocuments });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-semibold text-gray-900">{eventToEdit ? 'Editar Evento' : 'Novo Evento'}</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Título do Evento *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Digite o título do evento" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evento *</label>
                <select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Selecione o tipo</option>
                  {Object.entries(eventTypes).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modalidade *</label>
                <select required value={formData.modality} onChange={(e) => setFormData({ ...formData, modality: e.target.value as any })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Início *</label>
                <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horário de Início *</label>
                <input type="time" required value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Término</label>
                <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horário de Término</label>
                <input type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Local *</label>
                <select required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value as EventLocation })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Selecione o local</option>
                  {Object.entries(eventLocations).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Setor Responsável *</label>
                <select required value={formData.sector} onChange={(e) => setFormData({ ...formData, sector: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="">Selecione o setor</option>
                  {sectors.map(sector => (<option key={sector} value={sector}>{sector}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Máximo de Participantes</label>
                <input type="number" value={formData.maxParticipants} onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Opcional" />
              </div>
              {formData.location === 'gabinete' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Gabinete</label>
                  <input type="text" value={formData.locationDetails} onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Digite o nome do gabinete" />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
              <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="Descreva o evento detalhadamente" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Documentos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                <p className="text-xs text-gray-500 mb-4">PDF, DOC, XLS - Máximo 10MB por arquivo</p>
                <input type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">Selecionar Arquivos</label>
              </div>
              {formData.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2"><FileText className="w-4 h-4 text-gray-500" /><span className="text-sm text-gray-700">{file.name}</span><span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span></div>
                      <button type="button" onClick={() => removeDocument(index)} className="text-red-600 hover:text-red-800"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="isPublic" checked={formData.isPublic} onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">Evento público (visível no calendário público)</label>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-2">Termo de Responsabilidade *</h3>
              <p className="text-sm text-gray-600 mb-4">
                Para criar ou editar um evento, é obrigatório ler e aceitar o Termo de Responsabilidade. Clique no botão abaixo para visualizar o documento.
              </p>
              <div 
                className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-indigo-50 hover:border-indigo-400 transition-colors"
                onClick={() => setIsPdfModalOpen(true)}
              >
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-indigo-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Visualizar Termo de Responsabilidade</p>
                    <p className="text-xs text-gray-500">O documento será aberto em uma nova janela.</p>
                  </div>
                </div>
                {termsAccepted ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Aceito</span>
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-600">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Pendente</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white z-10">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancelar</button>
              <button type="submit" disabled={!termsAccepted} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"><Save className="w-4 h-4" /><span>Salvar Evento</span></button>
            </div>
          </form>
        </div>
      </div>
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onAccept={handleAcceptTerms}
        pdfUrl={pdfUrl}
      />
    </>
  );
};

export default EventForm;
