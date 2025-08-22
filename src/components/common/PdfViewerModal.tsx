import React from 'react';
import Modal from './Modal';
import { Check, X, ExternalLink, AlertTriangle } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  pdfUrl: string;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ isOpen, onClose, onAccept, pdfUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Termo de Responsabilidade"
      size="xl" 
      footer={
        <>
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <button
            onClick={onAccept}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Li e Aceito os Termos</span>
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800">Não consegue ver o documento?</h4>
            <p className="text-sm text-yellow-700">
              Se o quadro abaixo estiver em branco, o servidor do documento pode estar bloqueando a visualização. 
              Use o botão abaixo para abri-lo em uma nova guia.
            </p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir documento em nova guia</span>
            </a>
          </div>
        </div>
        
        <div className="w-full h-[60vh] border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
          <iframe
            src={pdfUrl}
            title="Termo de Responsabilidade"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      </div>
    </Modal>
  );
};

export default PdfViewerModal;
