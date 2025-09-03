import React, { useState, useCallback, useEffect, useRef } from 'react';
// CORREÇÃO: Importa o Supabase de um CDN para resolver o erro de compilação.
import { createClient, SupabaseClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// ====================================================================================
// TYPES DEFINITION
// ====================================================================================
export type UserRole = 'photographer' | 'client';

export interface Photo {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Gallery {
  id: string; // This will be the UUID from Supabase
  clientName: string;
  photographerName: string;
  photographerType: string;
  photographerAvatar: string;
  coverImage: string;
  title: string;
  subtitle: string;
  photos: Photo[];
  created_at?: string; // Supabase adds this automatically
}


// ====================================================================================
// SUPABASE SETUP
// ====================================================================================
// SUPABASE: Substitua com a URL e a chave anon do seu projeto Supabase.
const supabaseUrl = 'https://<seu-projeto-id>.supabase.co';
const supabaseKey = '<sua-chave-anon-publica>';
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/*
// SUPABASE: Estrutura da tabela 'galleries' que você precisa criar no Supabase.
//
// CREATE TABLE public.galleries (
//   id uuid NOT NULL DEFAULT gen_random_uuid(),
//   created_at timestamp with time zone NOT NULL DEFAULT now(),
//   "clientName" text NOT NULL,
//   "photographerName" text NOT NULL,
//   "photographerType" text NOT NULL,
//   "photographerAvatar" text NOT NULL,
//   "coverImage" text NOT NULL,
//   title text NOT NULL,
//   subtitle text NOT NULL,
//   photos jsonb NULL DEFAULT '[]'::jsonb,
//   CONSTRAINT galleries_pkey PRIMARY KEY (id)
// );
//
// Lembre-se de ativar o RLS (Row Level Security) e criar políticas para permitir
// a leitura pública e a inserção/atualização apenas para usuários autenticados.
*/


// ====================================================================================
// ICONS
// ====================================================================================
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);
const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);
const HeartIcon = ({ className, isFilled }: { className?: string; isFilled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill={isFilled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const LinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

// ====================================================================================
// COMPONENTS
// ====================================================================================

// --- Component: AddGalleryModal.tsx ---
const AddGalleryModal: React.FC<{ onClose: () => void; onSave: (gallery: Omit<Gallery, 'id' | 'created_at'>) => void; }> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({ clientName: '', title: '', subtitle: '', coverImage: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGalleryData = {
      clientName: formData.clientName,
      photographerName: 'Caroline',
      photographerType: 'Fotógrafa',
      photographerAvatar: 'https://randomuser.me/api/portraits/women/34.jpg',
      coverImage: formData.coverImage,
      title: formData.title.toUpperCase(),
      subtitle: formData.subtitle.toUpperCase(),
      photos: [],
    };
    onSave(newGalleryData);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><CloseIcon className="w-6 h-6" /></button>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Álbum</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title" placeholder="Título do Álbum" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500" />
            <input type="text" name="subtitle" placeholder="Subtítulo (e.g., Data)" value={formData.subtitle} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500" />
            <input type="text" name="clientName" placeholder="Nome do Cliente" value={formData.clientName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500" />
            <input type="url" name="coverImage" placeholder="URL da Imagem de Capa" value={formData.coverImage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500" />
            <div className="pt-4"><button type="submit" className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-md hover:bg-gray-700">Salvar Álbum</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Component: ShareLinkModal.tsx ---
const ShareLinkModal: React.FC<{ link: string; onClose: () => void; }> = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Compartilhar link</h2>
        <div className="flex items-center gap-2">
          <input type="text" value={link} readOnly className="flex-grow px-3 py-2 bg-gray-100 border rounded-md" />
          <button onClick={handleCopy} className={`w-28 text-center font-semibold py-2 px-4 rounded-md transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Component: SelectionBar.tsx ---
const SelectionBar: React.FC<{ selectedCount: number; onConfirmSelection: () => void; }> = ({ selectedCount, onConfirmSelection }) => {
  if (selectedCount === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-4">
      <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-2xl rounded-sm text-zinc-900 py-3 px-6 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <DownloadIcon className="w-6 h-6 text-zinc-600" />
          <span className="font-semibold text-lg">{selectedCount} fotos selecionadas</span>
        </div>
        <button onClick={onConfirmSelection} className="ml-8 bg-zinc-800 hover:bg-zinc-900 text-white font-light py-2 px-8 transition-colors duration-300 rounded-sm">Confirmar Seleção</button>
      </div>
    </div>
  );
};

// --- Component: Login.tsx ---
const Login: React.FC<{ gallery: Gallery; onClientLogin: () => void; onBack: () => void; }> = ({ gallery, onClientLogin, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-8">
      <div className="text-center mb-12"><h1 className="text-4xl font-light text-zinc-100 mb-2">{gallery.title}</h1><p className="text-lg text-zinc-400">by {gallery.photographerName}</p></div>
      <div className="w-full max-w-sm text-center bg-zinc-800 p-8 rounded-lg shadow-2xl">
        <h2 className="text-xl font-light mb-6 text-zinc-200">Log in to view gallery</h2>
        <button onClick={onClientLogin} className="w-full bg-zinc-200 hover:bg-white text-zinc-900 font-semibold py-3 px-4 transition-colors duration-300 rounded-md">Log in as Client ({gallery.clientName})</button>
      </div>
      <button onClick={onBack} className="mt-8 text-zinc-400 hover:text-white transition-colors duration-300 text-sm">&larr; Back to all galleries</button>
    </div>
  );
};

// --- Component: PhotoItem.tsx ---
const PhotoItem: React.FC<{ photo: Photo; isSelected: boolean; isLiked: boolean; onSelect: (id: number) => void; onLike: (id: number) => void; userRole: UserRole; }> = ({ photo, isSelected, isLiked, onSelect, onLike, userRole }) => {
  const handleMainClick = () => {
    if (userRole === 'photographer') onSelect(photo.id);
    else onLike(photo.id);
  };
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userRole === 'client') onLike(photo.id);
  };
  return (
    <div className="relative mb-4 break-inside-avoid group cursor-pointer" onClick={handleMainClick}>
      <img src={photo.url} alt={photo.alt} className={`w-full h-auto block rounded-md transition-all duration-300 ${isSelected ? 'ring-4 ring-rose-500 opacity-90' : 'group-hover:opacity-90'}`} style={{ aspectRatio: `${photo.width}/${photo.height}` }} loading="lazy" />
      {userRole === 'client' && (<button onClick={handleLikeClick} className={`absolute top-3 right-3 p-1.5 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-rose-500 text-white scale-100' : 'bg-black bg-opacity-30 text-white scale-0 group-hover:scale-100'}`}><HeartIcon className="w-6 h-6" isFilled={isLiked} /></button>)}
      {userRole === 'photographer' && isSelected && (<div className="absolute top-3 right-3"><CheckCircleIcon className="w-8 h-8 text-white bg-rose-500 rounded-full p-1" /></div>)}
      {userRole === 'photographer' && isLiked && (<div className="absolute bottom-3 left-3" title="Favoritada pelo cliente"><HeartIcon className="w-6 h-6 text-rose-500" isFilled={true} /></div>)}
    </div>
  );
};

// --- Component: PhotoGrid.tsx ---
const PhotoGrid: React.FC<{ photos: Photo[]; selectedPhotos: number[]; likedPhotos: number[]; onSelectPhoto: (id: number) => void; onLikePhoto: (id: number) => void; userRole: UserRole; }> = ({ photos, selectedPhotos, likedPhotos, onSelectPhoto, onLikePhoto, userRole }) => (
  <div className="pt-32 pb-32 px-4 md:px-6"><div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4">{photos.map(p => <PhotoItem key={p.id} photo={p} isSelected={selectedPhotos.includes(p.id)} isLiked={likedPhotos.includes(p.id)} onSelect={onSelectPhoto} onLike={onLikePhoto} userRole={userRole} />)}</div></div>
);

// --- Component: Header.tsx (for GalleryView) ---
const Header: React.FC<{ clientName: string; userRole: UserRole; onGoBack: () => void; onUpload?: () => void; onToggleShowOnlyLiked?: () => void; showOnlyLiked?: boolean; }> = ({ clientName, userRole, onGoBack, onUpload, onToggleShowOnlyLiked, showOnlyLiked }) => (
  <header className="fixed top-0 left-0 right-0 z-20 bg-[#111111] bg-opacity-90 backdrop-blur-sm">
    <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800">
      <div><h1 className="text-xl font-light tracking-widest text-zinc-200">GALLERY</h1></div>
      <div className="absolute left-1/2 -translate-x-1/2"><h2 className="text-lg font-light text-zinc-400 hidden md:block">{clientName}</h2></div>
      <div className="flex items-center gap-4 md:gap-6">
        {userRole === 'photographer' && (<>
          <div className="flex items-center gap-2"><span className="text-sm text-zinc-400 hidden sm:inline">Favoritas</span><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={showOnlyLiked} onChange={onToggleShowOnlyLiked} className="sr-only peer" /><div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div></label></div>
          <button onClick={onUpload} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"><UploadIcon className="w-5 h-5" /><span>Upload</span></button>
        </>)}
        <button onClick={onGoBack} className="text-zinc-400 hover:text-white"><CloseIcon className="w-7 h-7" /></button>
      </div>
    </div>
  </header>
);

// --- Component: LandingHeader.tsx ---
const LandingHeader: React.FC<{ isPhotographerLoggedIn: boolean; onLogin: () => void; onLogout: () => void; }> = ({ isPhotographerLoggedIn, onLogin, onLogout }) => (
  <header className="bg-white/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-30 border-b border-gray-200">
    <div className="max-w-screen-xl mx-auto px-6"><div className="flex justify-between items-center h-16">
      <div className="flex items-center"><span className="font-brand text-2xl font-bold tracking-wider text-gray-800">CAROLINE</span></div>
      <div className="flex items-center">{isPhotographerLoggedIn ? <button onClick={onLogout} className="font-nav text-gray-600 hover:text-gray-900">Sair</button> : <button onClick={onLogin} className="font-nav text-gray-600 hover:text-gray-900">Login Fotógrafo</button>}</div>
    </div></div>
  </header>
);

// --- Component: GalleryCard.tsx ---
const GalleryCard: React.FC<{ gallery: Gallery; onSelect: (id: string) => void; isPhotographerLoggedIn: boolean; onShare: (id: string) => void; }> = ({ gallery, onSelect, isPhotographerLoggedIn, onShare }) => (
  <div className="mb-12">
    <div className="relative bg-black group cursor-pointer shadow-lg hover:shadow-2xl" onClick={() => onSelect(gallery.id)}>
      <img src={gallery.coverImage} alt={gallery.title} className="w-full h-auto block aspect-[4/3] object-cover group-hover:opacity-80" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 bg-black bg-opacity-20">
        <p className="text-sm tracking-[0.3em] font-light mb-2">{gallery.subtitle}</p><h2 className="text-5xl font-bold text-center">{gallery.title}</h2>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100"><ChevronDownIcon className="w-8 h-8 text-white" /></div>
      <div className="absolute bottom-[-28px] right-8"><img src={gallery.photographerAvatar} alt={gallery.photographerName} className="w-14 h-14 rounded-full object-cover border-4 border-white" /></div>
    </div>
    <div className="mt-10 px-2">
      <h3 className="text-xl font-semibold text-gray-800">{gallery.photographerName}</h3><p className="text-gray-500">{gallery.photographerType}</p>
      {isPhotographerLoggedIn && (<div className="mt-4"><button onClick={(e) => { e.stopPropagation(); onShare(gallery.id); }} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-semibold"><LinkIcon className="w-4 h-4" /><span>Gerar link do álbum</span></button></div>)}
    </div>
  </div>
);

// ====================================================================================
// PAGES
// ====================================================================================

// --- Page: GalleryView.tsx ---
const GalleryView: React.FC<{ gallery: Gallery; userRole: UserRole; onGoBack: () => void; }> = ({ gallery, userRole, onGoBack }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const [likedPhotos, setLikedPhotos] = useState<number[]>([]);
  const [currentPhotos, setCurrentPhotos] = useState<Photo[]>(gallery.photos);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);

  useEffect(() => {
    setSelectedPhotos([]);
    setLikedPhotos([]);
    setCurrentPhotos(gallery.photos);
    setShowOnlyLiked(false);
  }, [gallery, userRole]);

  const handleSelectPhoto = useCallback((id: number) => {
    if (userRole === 'client') {
      setLikedPhotos(p => p.includes(id) ? p.filter(pId => pId !== id) : [...p, id]);
    } else {
      setSelectedPhotos(p => p.includes(id) ? p.filter(pId => pId !== id) : [...p, id]);
    }
  }, [userRole]);

  const handleLikePhoto = useCallback((id: number) => setLikedPhotos(p => p.includes(id) ? p.filter(pId => pId !== id) : [...p, id]), []);
  const handleConfirmSelection = () => alert(`Seleção confirmada para ${likedPhotos.length} fotos.`);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const newPhoto: Photo = { id: Date.now(), url: URL.createObjectURL(file), width: 800, height: 1200, alt: `Uploaded: ${file.name}` };
      setCurrentPhotos(prev => [newPhoto, ...prev]);
      event.target.value = '';
    }
  };
  const triggerUpload = () => document.getElementById('photo-upload-input')?.click();
  const handleToggleShowOnlyLiked = useCallback(() => setShowOnlyLiked(prev => !prev), []);

  const photosToDisplay = showOnlyLiked ? currentPhotos.filter(p => likedPhotos.includes(p.id)) : currentPhotos;

  return (
    <div className="bg-[#111111] min-h-screen text-white">
      {userRole === 'photographer' && <input type="file" id="photo-upload-input" className="hidden" onChange={handleFileUpload} accept="image/*" />}
      <Header clientName={gallery.clientName} userRole={userRole} onGoBack={onGoBack} onUpload={triggerUpload} onToggleShowOnlyLiked={handleToggleShowOnlyLiked} showOnlyLiked={showOnlyLiked} />
      <main><PhotoGrid photos={photosToDisplay} selectedPhotos={selectedPhotos} likedPhotos={likedPhotos} onSelectPhoto={handleSelectPhoto} onLikePhoto={handleLikePhoto} userRole={userRole} /></main>
      {userRole === 'client' && <SelectionBar selectedCount={likedPhotos.length} onConfirmSelection={handleConfirmSelection} />}
    </div>
  );
};

// --- Page: LandingPage.tsx ---
const LandingPage: React.FC<{ galleries: Gallery[]; onSelectGallery: (id: string) => void; isPhotographerLoggedIn: boolean; onPhotographerLogin: () => void; onPhotographerLogout: () => void; onAddGallery: (gallery: Omit<Gallery, 'id' | 'created_at'>) => void; }> = ({ galleries, onSelectGallery, isPhotographerLoggedIn, onPhotographerLogin, onPhotographerLogout, onAddGallery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleSaveGallery = (galleryData: Omit<Gallery, 'id' | 'created_at'>) => {
    onAddGallery(galleryData);
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


// ====================================================================================
// MAIN APP COMPONENT
// ====================================================================================
type View = 'landing' | 'login' | 'gallery';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);
  const [currentGalleries, setCurrentGalleries] = useState<Gallery[]>([]); // SUPABASE: Start with empty array
  const isInitialLoad = useRef(true);

  // SUPABASE: Fetch galleries from the database on initial load
  useEffect(() => {
    const fetchGalleries = async () => {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching galleries:', error);
      } else {
        setCurrentGalleries(data as Gallery[]);
      }
    };
    fetchGalleries();
  }, []);

  useEffect(() => {
    if (isInitialLoad.current && currentGalleries.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const galleryId = params.get('gallery');
      if (galleryId && currentGalleries.some(g => g.id === galleryId)) {
        isInitialLoad.current = false;
        setActiveGalleryId(galleryId);
        setView('login');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [currentGalleries]);

  const handlePhotographerLogin = () => setUser({ role: 'photographer' });
  const handlePhotographerLogout = () => { setUser(null); setView('landing'); setActiveGalleryId(null); };
  const handleSelectGallery = useCallback((id: string) => { setActiveGalleryId(id); setView(user?.role === 'photographer' ? 'gallery' : 'login'); }, [user]);
  const handleClientLogin = () => { setUser({ role: 'client' }); setView('gallery'); };
  const handleGoBack = () => { if (user?.role === 'client') setUser(null); setView('landing'); setActiveGalleryId(null); };
  const handleBackToLanding = () => { setView('landing'); setActiveGalleryId(null); };

  // SUPABASE: Function to add a new gallery to the database
  const handleAddGallery = async (galleryData: Omit<Gallery, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('galleries')
      .insert([galleryData])
      .select();

    if (error) {
      console.error('Error adding gallery:', error);
      alert('Não foi possível adicionar o álbum.');
    } else if (data) {
      setCurrentGalleries(prev => [data[0] as Gallery, ...prev]);
    }
  };

  const activeGallery = currentGalleries.find(g => g.id === activeGalleryId);

  if (view === 'gallery' && activeGallery && user) return <GalleryView gallery={activeGallery} userRole={user.role} onGoBack={handleGoBack} />;
  if (view === 'login' && activeGallery) return <Login gallery={activeGallery} onClientLogin={handleClientLogin} onBack={handleBackToLanding} />;

  return <LandingPage galleries={currentGalleries} onSelectGallery={handleSelectGallery} isPhotographerLoggedIn={user?.role === 'photographer'} onPhotographerLogin={handlePhotographerLogin} onPhotographerLogout={handlePhotographerLogout} onAddGallery={handleAddGallery} />;
};

export default App;
