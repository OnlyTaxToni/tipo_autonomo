import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { Answer } from '../App';

// Definición completa de perfiles de personalidad autónoma
interface PersonalityProfile {
  title: string;
  emoji: string;
  description: string;
  characteristics: string[];
  advice: string;
  recommendations: string[];
}

// Sistema completo de 6 personalidades autónomas
const personalityProfiles: Record<1 | 2 | 3 | 4 | 5 | 6, PersonalityProfile> = {
  1: {
    title: "La autónoma organizada",
    emoji: "🗂️",
    description: "Meticulosa, planifica todo, tiene su Excel y las facturas al día.",
    characteristics: [
      "Mantiene registros detallados de ingresos y gastos",
      "Planifica con anticipación sus obligaciones fiscales",
      "Tiene sistemas organizados para documentos",
      "Cumple siempre con los plazos establecidos"
    ],
    advice: "Revisa deducciones avanzadas, hasta lo más ordenado puede optimizar más.",
    recommendations: [
      "Explora nuevas herramientas de automatización fiscal",
      "Considera asesoría especializada para optimización avanzada",
      "Mantén tu excelente sistema pero busca eficiencias adicionales"
    ]
  },
  2: {
    title: "La autónoma apurada",
    emoji: "⏰",
    description: "Lo hace todo a última hora, con estrés, pero llega.",
    characteristics: [
      "Trabaja bajo presión en fechas límite",
      "Experimenta estrés durante períodos fiscales",
      "Logra cumplir pero con mucho esfuerzo",
      "Necesita recordatorios constantes"
    ],
    advice: "Ten tu 'caja de impuestos': separa un % fijo de cada ingreso y olvídate de sustos.",
    recommendations: [
      "Implementa un sistema de separación automática de impuestos",
      "Usa recordatorios y calendarios fiscales",
      "Considera herramientas que automaticen tus procesos"
    ]
  },
  3: {
    title: "La autónoma pasota",
    emoji: "😅",
    description: "Vive al día, procrastina, ignora el tema fiscal hasta que explota.",
    characteristics: [
      "Evita pensar en temas fiscales",
      "Procrastina las tareas administrativas",
      "Se siente abrumada por la burocracia",
      "Prefiere enfocarse solo en su trabajo creativo"
    ],
    advice: "Déjalo en manos de alguien que sí lo mire (nosotros 👋).",
    recommendations: [
      "Busca asesoría profesional integral",
      "Delega completamente la gestión fiscal",
      "Enfócate en lo que mejor sabes hacer"
    ]
  },
  4: {
    title: "La autónoma creativa",
    emoji: "🎨",
    description: "Tiene mil ideas y proyectos, pero la parte fiscal le aburre.",
    characteristics: [
      "Prioriza la creatividad sobre la administración",
      "Tiene múltiples proyectos en paralelo",
      "Ve lo fiscal como una distracción",
      "Busca soluciones simples y rápidas"
    ],
    advice: "Automatiza lo máximo posible para centrarte en crear sin preocupaciones.",
    recommendations: [
      "Implementa sistemas automatizados de facturación",
      "Usa herramientas que requieran mínima intervención",
      "Considera un asistente virtual para tareas administrativas"
    ]
  },
  5: {
    title: "La autónoma precavida",
    emoji: "🛡️",
    description: "Siempre va un paso por delante, busca seguridad y asesoría.",
    characteristics: [
      "Planifica con mucha anticipación",
      "Busca asesoramiento profesional regularmente",
      "Prefiere la seguridad a la improvisación",
      "Mantiene reservas para imprevistos"
    ],
    advice: "Perfecto enfoque. Considera herramientas que te den aún más control y previsión.",
    recommendations: [
      "Explora herramientas de análisis predictivo",
      "Mantén tu asesoría pero añade tecnología avanzada",
      "Considera seguros y coberturas adicionales"
    ]
  },
  6: {
    title: "La autónoma improvisada",
    emoji: "🎯",
    description: "Se lanzó sin plan, aprende sobre la marcha, comete errores pero se adapta.",
    characteristics: [
      "Aprende de la experiencia práctica",
      "Se adapta rápidamente a los cambios",
      "Comete errores pero los corrige",
      "Tiene mentalidad de crecimiento"
    ],
    advice: "Tu capacidad de adaptación es genial. Ahora toca estructurar un poco más.",
    recommendations: [
      "Implementa gradualmente sistemas más estructurados",
      "Mantén tu flexibilidad pero añade organización básica",
      "Busca formación práctica en gestión fiscal"
    ]
  }
};

// Función para calcular la puntuación exacta
const calculateScore = (answers: Answer[]): number => {
  const scoreMap = { A: 2, B: 1, C: 0.5 };
  return answers.reduce((sum, answer) => sum + scoreMap[answer], 0);
};

// Función para determinar el rango de puntuación
const getScoreRange = (score: number): string => {
  if (score >= 9) return '9-10 puntos';
  if (score >= 7.5) return '7.5-8.9 puntos';
  if (score >= 6) return '6-7.4 puntos';
  if (score >= 4.5) return '4.5-5.9 puntos';
  if (score >= 3) return '3-4.4 puntos';
  return '2.5 puntos';
};

// Función para obtener el color de la puntuación
const getScoreColor = (score: number): string => {
  if (score >= 9) return 'text-green-600';
  if (score >= 7.5) return 'text-blue-600';
  if (score >= 6) return 'text-indigo-600';
  if (score >= 4.5) return 'text-purple-600';
  if (score >= 3) return 'text-orange-600';
  return 'text-red-600';
};

// Función para obtener el mensaje de evaluación
const getEvaluationMessage = (score: number): string => {
  if (score >= 9) return '¡Excelente nivel de organización fiscal!';
  if (score >= 7.5) return 'Muy buen nivel de planificación y precaución';
  if (score >= 6) return 'Buen nivel pero con tendencia a la urgencia';
  if (score >= 4.5) return 'Enfoque creativo que necesita más estructura';
  if (score >= 3) return 'Necesitas apoyo para mejorar tu organización';
  return 'Necesitas apoyo profesional urgente';
};

interface ResultScreenProps {
  result: 1 | 2 | 3 | 4 | 5 | 6;
  answers: Answer[];
  onRestart: () => void;
}

export default function ResultScreen({ result, answers, onRestart }: ResultScreenProps) {
  const profile = personalityProfiles[result];
  const score = calculateScore(answers);
  const scoreRange = getScoreRange(score);
  const scoreColor = getScoreColor(score);
  const evaluationMessage = getEvaluationMessage(score);

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
      
      <div className="max-w-4xl mx-auto w-full">
        {/* Resultado Principal */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">
              {profile.emoji}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#434C8F' }}>
              {profile.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed">
              {profile.description}
            </p>
            
            {/* Sistema de puntuación detallado */}
            <div className="mb-8 p-6 rounded-2xl bg-gray-50 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Tu evaluación completa</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#434C8F' }}>
                      {score}
                    </span>
                    <span className="text-2xl text-gray-500">/10</span>
                  </div>
                  <p className="text-sm text-gray-600">Puntuación obtenida</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-semibold ${scoreColor} mb-1`}>
                    {scoreRange}
                  </p>
                  <p className="text-sm text-gray-600">Rango de clasificación</p>
                </div>
              </div>
              <p className={`text-center mt-4 text-lg font-medium ${scoreColor}`}>
                {evaluationMessage}
              </p>
            </div>

            {/* Características del perfil */}
            <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: '#D9DAFA' }}>
              <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Características de tu perfil:</h3>
              <ul className="text-left space-y-2">
                {profile.characteristics.map((characteristic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-700">{characteristic}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Consejo personalizado */}
            <div className="mb-8 p-6 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">💡 Tu consejo personalizado:</h3>
              <p className="text-lg text-gray-700 mb-4">
                {profile.advice}
              </p>
            </div>

            {/* Recomendaciones específicas */}
            <div className="p-6 rounded-2xl bg-green-50 border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Recomendaciones para ti:</h3>
              <ul className="text-left space-y-2">
                {profile.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
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