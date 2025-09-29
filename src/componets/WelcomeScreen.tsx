import React from 'react';
import { Play } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Header con logo */}
      <div className="absolute top-0 left-0 right-0 p-6">
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
              className="h-8 md:h-10"
            />
          </a>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
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
            Empezar encuesta ✍️
          </button>
        </div>
      </div>
    </div>
  );
}