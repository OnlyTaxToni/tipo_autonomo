import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { Answer } from '../App';

interface Result {
  title: string;
  emoji: string;
  description: string;
  advice: string;
}

const results: Record<1 | 2 | 3 | 4 | 5 | 6, Result> = {
  1: {
    title: "La autónoma organizada",
    emoji: "🗂️",
    description: "Meticulosa, planifica todo, tiene su Excel y las facturas al día.",
    advice: "Revisa deducciones avanzadas, hasta lo más ordenado puede optimizar más."
  },
  2: {
    title: "La autónoma apurada",
    emoji: "⏰",
    description: "Lo hace todo a última hora, con estrés, pero llega.",
    advice: "Ten tu 'caja de impuestos': separa un % fijo de cada ingreso y olvídate de sustos"
  },
  3: {
    title: "La autónoma pasota",
    emoji: "😅",
    description: "Vive al día, procrastina, ignora el tema fiscal hasta que explota.",
    advice: "Déjalo en manos de alguien que sí lo mire (nosotros 👋)."
  },
  4: {
    title: "La autónoma creativa",
    emoji: "🎨",
    description: "Tiene mil ideas y proyectos, pero la parte fiscal le aburre.",
    advice: "Automatiza lo máximo posible para centrarte en crear sin preocupaciones."
  },
  5: {
    title: "La autónoma precavida",
    emoji: "🛡️",
    description: "Siempre va un paso por delante, busca seguridad y asesoría.",
    advice: "Perfecto enfoque. Considera herramientas que te den aún más control y previsión."
  },
  6: {
    title: "La autónoma improvisada",
    emoji: "🎯",
    description: "Se lanzó sin plan, aprende sobre la marcha, comete errores pero se adapta.",
    advice: "Tu capacidad de adaptación es genial. Ahora toca estructurar un poco más."
  }
};

// Función para calcular la puntuación
const calculateScore = (answers: Answer[]): number => {
  const scoreMap = { A: 2, B: 1, C: 0.5 };
  const totalScore = answers.reduce((sum, answer) => sum + scoreMap[answer], 0);
  // Devolver puntuación directa (rango: 2.5 a 10)
  return totalScore;
};

// Función para obtener el color de la puntuación
const getScoreColor = (score: number): string => {
  if (score >= 8.5) return 'text-green-600';
  if (score >= 7) return 'text-blue-600';
  if (score >= 5.5) return 'text-yellow-600';
  if (score >= 4) return 'text-orange-600';
  return 'text-red-600';
};

// Función para obtener el mensaje de la puntuación
const getScoreMessage = (score: number): string => {
  if (score >= 8.5) return '¡Excelente organización fiscal!';
  if (score >= 7) return 'Muy buen nivel de organización';
  if (score >= 5.5) return 'Nivel de organización aceptable';
  if (score >= 4) return 'Necesitas mejorar la organización';
  return 'Necesitas ayuda urgente';
};

interface ResultScreenProps {
  result: 1 | 2 | 3 | 4 | 5 | 6;
  answers: Answer[];
  onRestart: () => void;
}

export default function ResultScreen({ result, answers, onRestart }: ResultScreenProps) {
  const currentResult = results[result];
  const score = calculateScore(answers);
  const scoreColor = getScoreColor(score);
  const scoreMessage = getScoreMessage(score);

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
            
            {/* Sistema de puntuación */}
            <div className="mb-6 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Tu puntuación de organización fiscal</h3>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-4xl font-bold" style={{ color: '#434C8F' }}>
                  {score}
                </span>
                <span className="text-2xl text-gray-500">/10</span>
              </div>
              <p className={`text-lg font-semibold ${scoreColor}`}>
                {scoreMessage}
              </p>
            </div>
            
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