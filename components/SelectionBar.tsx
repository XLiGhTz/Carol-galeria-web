
import React from 'react';
import { DownloadIcon } from './icons';

interface SelectionBarProps {
  selectedCount: number;
  onConfirmSelection: () => void;
}

const SelectionBar: React.FC<SelectionBarProps> = ({ selectedCount, onConfirmSelection }) => {
  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center p-4">
        <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm shadow-2xl rounded-sm text-zinc-900 py-3 px-6 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <DownloadIcon className="w-6 h-6 text-zinc-600"/>
                <span className="font-semibold text-lg">{selectedCount}</span>
            </div>
            <button
                onClick={onConfirmSelection}
                className="ml-8 bg-zinc-800 hover:bg-zinc-900 text-white font-light py-2 px-8 transition-colors duration-300 rounded-sm"
            >
                Baixar
            </button>
        </div>
    </div>
  );
};

export default SelectionBar;
