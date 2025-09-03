import React from 'react';
import { Gallery } from '../types';
import { ChevronDownIcon, LinkIcon } from './icons';

interface GalleryCardProps {
  gallery: Gallery;
  onSelect: (id: string) => void;
  isPhotographerLoggedIn: boolean;
  onShare: (id: string) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery, onSelect, isPhotographerLoggedIn, onShare }) => {
  return (
    <div className="mb-12">
        <div 
            className="relative bg-black group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            onClick={() => onSelect(gallery.id)}
        >
            <img 
                src={gallery.coverImage}
                alt={`Cover for ${gallery.title}`}
                className="w-full h-auto block aspect-[4/3] object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 bg-black bg-opacity-20">
                <p className="text-sm tracking-[0.3em] font-light mb-2">{gallery.subtitle}</p>
                <h2 className="text-5xl font-bold text-center">{gallery.title}</h2>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300">
                <ChevronDownIcon className="w-8 h-8 text-white" />
            </div>
            <div className="absolute bottom-[-28px] right-8">
                <img 
                    src={gallery.photographerAvatar}
                    alt={gallery.photographerName}
                    className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-md"
                />
            </div>
        </div>
        <div className="mt-10 px-2">
            <h3 className="text-xl font-semibold text-gray-800">{gallery.photographerName}</h3>
            <p className="text-gray-500">{gallery.photographerType}</p>
            {isPhotographerLoggedIn && (
                <div className="mt-4">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click from firing
                            onShare(gallery.id);
                        }}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-semibold"
                        aria-label={`Gerar link para o álbum ${gallery.title}`}
                    >
                        <LinkIcon className="w-4 h-4" />
                        <span>Gerar link do álbum</span>
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default GalleryCard;