import React from 'react';
import { Photo, UserRole } from '../types';
import { CheckCircleIcon, HeartIcon } from './icons';

interface PhotoItemProps {
  photo: Photo;
  isSelected: boolean;
  isLiked: boolean;
  onSelect: (id: number) => void;
  onLike: (id: number) => void;
  userRole: UserRole;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, isSelected, isLiked, onSelect, onLike, userRole }) => {
  const handleClick = () => {
    if (userRole === 'client') {
      onSelect(photo.id);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userRole === 'client') {
      onLike(photo.id);
    }
  };

  return (
    <div 
        className={`relative mb-4 break-inside-avoid group ${userRole === 'client' ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
        aria-label={`View photo ${photo.id}`}
    >
      <img
        src={photo.url}
        alt={photo.alt}
        className={`w-full h-auto block transition-transform duration-300 ${isSelected ? 'transform scale-[0.98] opacity-80' : 'group-hover:opacity-90'}`}
        style={{ aspectRatio: `${photo.width}/${photo.height}` }}
        loading="lazy"
      />
      {userRole === 'client' && (
        <>
            <div className={`absolute inset-0 transition-all duration-300 pointer-events-none ${isSelected ? 'ring-2 ring-white ring-inset' : ''}`}></div>
            
            <button
                onClick={handleLikeClick}
                aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
                className={`absolute top-3 left-3 p-1.5 rounded-full flex items-center justify-center transition-all duration-300
                ${isLiked
                    ? 'text-red-500 scale-100'
                    : 'bg-black bg-opacity-30 text-white scale-0 group-hover:scale-100 hover:text-red-400'}`}
            >
                <HeartIcon className="w-6 h-6" isFilled={isLiked} />
            </button>

            <div className="absolute top-3 right-3 pointer-events-none">
                <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                    ${isSelected 
                        ? 'bg-white text-black scale-100' 
                        : 'bg-black bg-opacity-30 text-white scale-0 group-hover:scale-100'}`}
                >
                    <CheckCircleIcon className="w-7 h-7"/>
                </div>
            </div>
        </>
      )}
      {userRole === 'photographer' && isLiked && (
          <div 
            className="absolute top-3 left-3 p-1.5 rounded-full bg-black bg-opacity-60 flex items-center justify-center pointer-events-none"
            title="Favoritada pelo cliente"
            aria-label="Favoritada pelo cliente"
          >
              <HeartIcon className="w-5 h-5 text-red-500" isFilled={true} />
          </div>
      )}
    </div>
  );
};

export default PhotoItem;