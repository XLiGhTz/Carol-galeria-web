import React from 'react';

interface LandingHeaderProps {
  isPhotographerLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ isPhotographerLoggedIn, onLogin, onLogout }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm fixed top-0 left-0 right-0 z-30 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Side */}
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <span className="font-brand text-2xl font-bold tracking-wider text-gray-800">CAROLINE</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
             {isPhotographerLoggedIn ? (
                <button onClick={onLogout} className="font-nav text-gray-600 hover:text-gray-900 transition-colors">
                  Sair
                </button>
              ) : (
                <button onClick={onLogin} className="font-nav text-gray-600 hover:text-gray-900 transition-colors">
                  Login Fotógrafo
                </button>
              )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;