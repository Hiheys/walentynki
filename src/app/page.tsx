"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Heart, HeartCrack, PartyPopper, Sparkles } from 'lucide-react';

function App() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sprawdź, czy użytkownik jest na urządzeniu mobilnym
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDevices = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/;
    setIsMobile(mobileDevices.test(userAgent));

    // Symulacja ładowania strony
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const moveNoButton = () => {
    if (noButtonRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      // Calculate boundaries within the container with padding
      const padding = 20;
      const maxX = containerRect.width - buttonRect.width - padding;
      const maxY = containerRect.height - buttonRect.height - padding;
      
      // Generate new position within container bounds
      const newX = Math.max(padding, Math.min(maxX, Math.random() * maxX));
      const newY = Math.max(padding, Math.min(maxY, Math.random() * maxY));
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleAccept = () => {
    setAccepted(true);
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg mx-4">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">Ładowanie...</h1>
          <p className="text-gray-700 text-xl">Proszę czekać, strona się ładuje.</p>
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg mx-4">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">Uwaga!</h1>
          <p className="text-gray-700 text-xl">Proszę wejść na stronę z komputera, aby zobaczyć jej zawartość.</p>
        </div>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center">
        <div className="text-center space-y-6 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-lg mx-4 transform transition-all duration-500 hover:scale-105">
          <div className="flex justify-center">
            <PartyPopper className="w-20 h-20 text-pink-500 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Wiedziałem/am, że się zgodzisz! 💖
          </h1>
          <p className="text-gray-700 text-xl">
            To będą najpiękniejsze walentynki!
          </p>
          <div className="flex justify-center gap-6">
            <Sparkles className="w-10 h-10 text-pink-500 animate-spin" />
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
            <Sparkles className="w-10 h-10 text-pink-500 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center p-4">
      <div 
        ref={containerRef}
        className="text-center space-y-8 p-12 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl max-w-2xl mx-4 relative min-h-[400px] w-full"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
          <div className="absolute top-4 left-4">
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <div className="absolute top-4 right-4">
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
        </div>
        
        <div className="relative">
          <Heart className="w-24 h-24 text-red-500 mx-auto animate-pulse" />
          <h2 className="text-3xl font-bold text-pink-500 mt-6">
          No heeej. Mam takie pytanie. 
          </h2>
          <h1 className="text-5xl font-bold text-pink-600 mt-6 mb-12">
           Zostaniesz może moją Walentynką? 💝
          </h1>
          <div className="flex justify-center gap-6 items-center">
            <button
              onClick={handleAccept}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-full transform hover:scale-110 transition-all duration-300 shadow-xl text-xl"
            >
              TAK! 💖
            </button>
            <button
              ref={noButtonRef}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{
                position: 'absolute',
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'all 0.3s ease',
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-12 rounded-full shadow-xl flex items-center gap-2 text-xl"
            >
              <HeartCrack className="w-5 h-5" />
              Nie
            </button>
          </div>
        </div>
      </div>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                top: '-5vh',
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff69b4', '#ff1493', '#ff0000', '#ff69b4'][
                  Math.floor(Math.random() * 4)
                ],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;