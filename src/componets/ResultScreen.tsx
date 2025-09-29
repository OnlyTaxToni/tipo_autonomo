import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { Answer } from '../App';

interface Result {
  title: string;
  emoji: string;
  description: string;
  advice: string;
}

const results: Record<1 | 2 | 3, Result> = {
  1: {
    title: "La autónoma organizada",
    emoji: "🗂️",
    description: "Eres la reina del control fiscal y tus carpetas están más ordenadas que la biblioteca nacional.",
    advice: "Revisa deducciones, hasta lo más ordenado puede ahorrar más."
  },
  2: {
    title: "La autónoma apurada",
    emoji: "⏰",
    description: "Tu vida es un sprint cada trimestre.",
    advice: "Pon el cronómetro a tu favor y evita recargos."
  },
  3: {
    title: "La autónoma pasota",
    emoji: "😅",
    description: "Para ti, lo fiscal es un \"ya lo miraré\".",
    advice: "Déjalo en manos de alguien que sí lo mire (nosotros 👋)."
  }
};

interface ResultScreenProps {
  result: 1 | 2 | 3;
  answers: Answer[];
  onRestart: () => void;
}

export default function ResultScreen({ result, answers, onRestart }: ResultScreenProps) {
  const currentResult = results[result];

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* Header con logo */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="flex justify-center">
          <img 
            src="/onlytax oscuro.png" 
            alt="OnlyTax" 
            className="h-8 md:h-10"
          />
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto w-full">
        {/* Resultado */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">
              {currentResult.emoji}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#434C8F' }}>
              {currentResult.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
              {currentResult.description}
            </p>
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#D9DAFA' }}>
              <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Tu consejo personalizado:</h3>
              <p className="text-lg text-gray-700">
                {currentResult.advice}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <RefreshCw className="w-6 h-6" />
              Hacer el quiz otra vez
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}