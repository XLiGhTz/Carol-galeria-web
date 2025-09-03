import React from 'react';
import { Gallery } from '../types';

interface LoginProps {
  gallery: Gallery;
  onClientLogin: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ gallery, onClientLogin, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-zinc-100 mb-2">{gallery.title}</h1>
        <p className="text-lg text-zinc-400">by {gallery.photographerName}</p>
      </div>
      
      <div className="w-full max-w-sm text-center bg-zinc-800 p-8 rounded-lg shadow-2xl">
        <h2 className="text-xl font-light mb-6 text-zinc-200">Log in to view gallery</h2>
        <div className="space-y-4">
          <button
            onClick={onClientLogin}
            className="w-full bg-zinc-200 hover:bg-white text-zinc-900 font-semibold py-3 px-4 transition-colors duration-300 rounded-md"
          >
            Log in as Client ({gallery.clientName})
          </button>
        </div>
      </div>
       <button
          onClick={onBack}
          className="mt-8 text-zinc-400 hover:text-white transition-colors duration-300 text-sm"
        >
          &larr; Back to all galleries
        </button>
    </div>
  );
};

export default Login;