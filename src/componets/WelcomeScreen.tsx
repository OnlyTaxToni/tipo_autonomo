import React from 'react';
import { Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen p-4 pt-24 md:pt-28">
      {/* Header con logo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-purple-100 to-indigo-100 p-4 md:p-6 shadow-sm">
        <div className="flex justify-center">
          <a 
            href="https://onlytax.es" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src="/onlytax oscuro.png" 
              alt="OnlyTax" 
              className="h-6 md:h-8"
            />
          </a>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto text-center flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
          {/* Imagen visual de los tipos de autónomas */}
          <div className="mb-8">
            <img 
              src="/tipos_autonomos.png" 
              alt="Diferentes tipos de autónomas trabajando" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
            />
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              ¿QUÉ TIPO DE AUTÓNOMA ERES? 🖥️💰
            </h1>
            
            <div className="text-lg md:text-xl text-gray-600 leading-relaxed space-y-4">
              <p>Responde 5 preguntas rápidas y te damos tu resultado con un consejo útil para que el próximo trimestre sea más fácil.</p>
              <p className="text-2xl font-semibold text-indigo-600">¿Lista?</p>
            </div>
          </div>

          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <Play className="w-6 h-6" />
            Empezar quiz ✍️
          </button>
        </div>
      </div>
    </div>
  );
}