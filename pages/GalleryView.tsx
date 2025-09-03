import React, { useState, useCallback, useEffect } from 'react';
import { Photo, UserRole, Gallery } from '../types';
import Header from '../components/Header';
import PhotoGrid from '../components/PhotoGrid';
import SelectionBar from '../components/SelectionBar';

interface GalleryViewProps {
    gallery: Gallery;
    userRole: UserRole;
    onGoBack: () => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ gallery, userRole, onGoBack }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  
  // State for photographer view
  const [currentPhotos, setCurrentPhotos] = useState<Photo[]>(gallery.photos);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  // Reset selections when component mounts or user/gallery changes
  useEffect(() => {
    setSelectedPhotos([]);
    setLikedPhotos([]);
    setCurrentPhotos(gallery.photos);
    setShowOnlyLiked(false);
  }, [gallery, userRole]);

  const handleSelectPhoto = useCallback((id: number) => {
    setSelectedPhotos((prev) =>
      prev.includes(id) ? prev.filter((photoId) => photoId !== id) : [...prev, id]
    );
  }, []);

  const handleLikePhoto = useCallback((id: number) => {
    setLikedPhotos((prev) =>
        prev.includes(id) ? prev.filter((photoId) => photoId !== id) : [...prev, id]
    );
  }, []);

  const handleConfirmSelection = () => {
    alert(`Seleção confirmada para ${selectedPhotos.length} fotos. Uma notificação seria enviada para ${gallery.photographerName}.`);
    console.log('Selected photo IDs:', selectedPhotos);
  };

  // Photographer-specific handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const newPhoto: Photo = {
            id: Date.now(), // Use timestamp for unique ID
            url: URL.createObjectURL(file), // Display local file temporarily
            width: 800, // Placeholder width
            height: 1200, // Placeholder height
            alt: `Uploaded: ${file.name}`,
        };
        setCurrentPhotos(prev => [newPhoto, ...prev]);
        alert(`Simulação de upload de ${file.name}. A foto agora está visível na galeria.`);
        event.target.value = ''; // Reset file input
    }
  };

  const triggerUpload = () => {
    document.getElementById('photo-upload-input')?.click();
  };
  
  const handleToggleShowOnlyLiked = useCallback(() => {
    setShowOnlyLiked(prev => !prev);
  }, []);

  const photosToDisplay = showOnlyLiked
    ? currentPhotos.filter(p => likedPhotos.includes(p.id))
    : currentPhotos;

  return (
    <div className="bg-[#111111] min-h-screen text-white font-sans">
      {userRole === 'photographer' && (
        <input 
            type="file" 
            id="photo-upload-input" 
            className="hidden" 
            onChange={handleFileUpload} 
            accept="image/*,.arw,.cr2,.cr3,.dng,.nef,.orf,.raf,.rw2,.pef"
        />
      )}
      <Header 
        clientName={gallery.clientName} 
        userRole={userRole} 
        onGoBack={onGoBack}
        onUpload={userRole === 'photographer' ? triggerUpload : undefined}
        onToggleShowOnlyLiked={userRole === 'photographer' ? handleToggleShowOnlyLiked : undefined}
        showOnlyLiked={showOnlyLiked}
      />
      <main>
        <PhotoGrid
          photos={photosToDisplay}
          selectedPhotos={selectedPhotos}
          likedPhotos={likedPhotos}
          onSelectPhoto={handleSelectPhoto}
          onLikePhoto={handleLikePhoto}
          userRole={userRole}
        />
      </main>
      {userRole === 'client' && (
        <SelectionBar 
            selectedCount={selectedPhotos.length} 
            onConfirmSelection={handleConfirmSelection} 
        />
      )}
    </div>
  );
};

export default GalleryView;