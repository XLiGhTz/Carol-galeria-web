import React from 'react';
import { Photo, UserRole } from '../types';
import PhotoItem from './PhotoItem';

interface PhotoGridProps {
  photos: Photo[];
  selectedPhotos: number[];
  likedPhotos: number[];
  onSelectPhoto: (id: number) => void;
  onLikePhoto: (id: number) => void;
  userRole: UserRole;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, selectedPhotos, likedPhotos, onSelectPhoto, onLikePhoto, userRole }) => {
  return (
    <div className="pt-32 pb-32 px-4 md:px-6">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4">
            {photos.map((photo) => (
                <PhotoItem
                    key={photo.id}
                    photo={photo}
                    isSelected={selectedPhotos.includes(photo.id)}
                    isLiked={likedPhotos.includes(photo.id)}
                    onSelect={onSelectPhoto}
                    onLike={onLikePhoto}
                    userRole={userRole}
                />
            ))}
      </div>
    </div>
  );
};

export default PhotoGrid;
