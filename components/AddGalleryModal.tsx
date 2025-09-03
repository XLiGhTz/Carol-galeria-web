import React, { useState, FormEvent } from 'react';
import { Gallery } from '../types';
import { CloseIcon } from './icons';

interface AddGalleryModalProps {
  onClose: () => void;
  onSave: (gallery: Gallery) => void;
}

const AddGalleryModal: React.FC<AddGalleryModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    title: '',
    subtitle: '',
    coverImage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newGallery: Gallery = {
      id: `${formData.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      clientName: formData.clientName,
      photographerName: 'Caroline', // Assuming the logged in photographer is Caroline
      photographerType: 'Fotógrafa',
      photographerAvatar: 'https://randomuser.me/api/portraits/women/34.jpg', // Placeholder avatar
      coverImage: formData.coverImage,
      title: formData.title.toUpperCase(),
      subtitle: formData.subtitle.toUpperCase(),
      photos: [], // New galleries start with no photos
    };
    onSave(newGallery);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Álbum</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Álbum</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
            </div>
             <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo (e.g., Data)</label>
              <input type="text" name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
            </div>
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
              <input type="text" name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
            </div>
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">URL da Imagem de Capa</label>
              <input type="url" name="coverImage" id="coverImage" value={formData.coverImage} onChange={handleChange} required placeholder="https://example.com/image.jpg" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Salvar Álbum
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGalleryModal;
