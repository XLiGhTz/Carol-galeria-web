import React from 'react';
import { DownloadIcon, CloseIcon, UploadIcon } from './icons';
import { UserRole } from '../types';

interface HeaderProps {
  clientName: string;
  userRole: UserRole;
  onGoBack: () => void;
  onUpload?: () => void;
  onToggleShowOnlyLiked?: () => void;
  showOnlyLiked?: boolean;
}

const Header: React.FC<HeaderProps> = ({ clientName, userRole, onGoBack, onUpload, onToggleShowOnlyLiked, showOnlyLiked }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-[#111111] bg-opacity-90 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800">
        <div className="flex items-center gap-4">
            {/* Simplified logo for gallery view */}
             <div>
                <h1 className="text-xl font-light tracking-widest text-zinc-200">GALLERY</h1>
            </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
            <h2 className="text-lg font-light text-zinc-400">{clientName}</h2>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
            {userRole === 'photographer' && (
                <>
                    <div className="flex items-center gap-2" title="Ver apenas fotos favoritadas pelo cliente">
                        <span className="text-sm text-zinc-400 hidden sm:inline">Favoritas</span>
                        <label htmlFor="liked-toggle" className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={showOnlyLiked} onChange={onToggleShowOnlyLiked} id="liked-toggle" className="sr-only peer" />
                            <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                        </label>
                    </div>
                    <button onClick={onUpload} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                        <UploadIcon className="w-5 h-5" />
                        <span>Upload RAW</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                        <DownloadIcon className="w-5 h-5" />
                        <span>Baixar Todas</span>
                    </button>
                </>
            )}
            <button onClick={onGoBack} className="text-zinc-400 hover:text-white transition-colors" aria-label="Close gallery and return to landing page">
                <CloseIcon className="w-7 h-7" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;