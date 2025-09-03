import React, { useState, useEffect } from 'react';
import { CloseIcon, CheckCircleIcon } from './icons';

interface ShareLinkModalProps {
  link: string;
  onClose: () => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
    });
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md relative p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors" aria-label="Fechar modal">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 id="share-modal-title" className="text-2xl font-bold text-gray-800 mb-4">Compartilhar link</h2>
        <p className="text-gray-600 mb-6">Envie este link para seu cliente acessar a galeria.</p>
        
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={link} 
            readOnly 
            className="flex-grow px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            aria-label="Link compartilhável da galeria"
          />
          <button
            onClick={handleCopy}
            className={`w-28 text-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${copied ? 'bg-green-600 hover:bg-green-600' : ''}`}
          >
            {copied ? (
                <span className="flex items-center justify-center gap-1.5">
                    <CheckCircleIcon className="w-5 h-5" /> Copiado
                </span>
            ) : (
                'Copiar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
