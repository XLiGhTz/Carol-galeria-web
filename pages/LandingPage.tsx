import React, { useState } from 'react';
import { Gallery } from '../types';
import LandingHeader from '../components/LandingHeader';
import GalleryCard from '../components/GalleryCard';
import AddGalleryModal from '../components/AddGalleryModal';
import { PlusIcon } from '../components/icons';
import ShareLinkModal from '../components/ShareLinkModal';

interface LandingPageProps {
  galleries: Gallery[];
  onSelectGallery: (id: string) => void;
  isPhotographerLoggedIn: boolean;
  onPhotographerLogin: () => void;
  onPhotographerLogout: () => void;
  onAddGallery: (gallery: Gallery) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ galleries, onSelectGallery, isPhotographerLoggedIn, onPhotographerLogin, onPhotographerLogout, onAddGallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleSaveGallery = (gallery: Gallery) => {
    onAddGallery(gallery);
    setIsModalOpen(false);
  };

  const handleShareGallery = (galleryId: string) => {
    const link = `${window.location.origin}${window.location.pathname}?gallery=${galleryId}`;
    setShareLink(link);
  };

  return (
    <div className="bg-[#f9f9f9] text-gray-800">
      <LandingHeader 
        isPhotographerLoggedIn={isPhotographerLoggedIn}
        onLogin={onPhotographerLogin}
        onLogout={onPhotographerLogout}
      />
      <main className="pt-48 max-w-screen-xl mx-auto px-6">
        <section className="text-center mb-24">
          <h1 className="font-brand text-5xl font-bold text-gray-800 tracking-wide">Porque cada história merece ser sentida</h1>
          {isPhotographerLoggedIn && (
            <div className="mt-12">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gray-800 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <PlusIcon className="w-5 h-5" />
                Adicionar Novo Álbum
              </button>
            </div>
          )}
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {galleries.map(gallery => (
              <GalleryCard 
                key={gallery.id} 
                gallery={gallery} 
                onSelect={onSelectGallery}
                isPhotographerLoggedIn={isPhotographerLoggedIn}
                onShare={handleShareGallery}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className="text-center py-12 mt-12">
        <p className="text-gray-400">&copy; 2024 Caroline. All rights reserved.</p>
      </footer>
       {isModalOpen && <AddGalleryModal onClose={() => setIsModalOpen(false)} onSave={handleSaveGallery} />}
       {shareLink && <ShareLinkModal link={shareLink} onClose={() => setShareLink(null)} />}
    </div>
  );
};

export default LandingPage;