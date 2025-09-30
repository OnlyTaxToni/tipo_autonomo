import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { Answer } from '../App';

// PERFILES COMPLETAMENTE REDEFINIDOS CON COHERENCIA CONCEPTUAL
interface PersonalityProfile {
  title: string;
  emoji: string;
  description: string;
  characteristics: string[];
  advice: string;
  recommendations: string[];
  scoreRange: string;
}

// SISTEMA COMPLETO DE 6 PERSONALIDADES RECALIBRADAS
const personalityProfiles: Record<1 | 2 | 3 | 4 | 5 | 6, PersonalityProfile> = {
  1: {
    title: "La autónoma organizada",
    emoji: "🗂️",
    description: "Meticulosa, planifica todo, tiene su Excel y las facturas al día. Eres la reina del control fiscal.",
    scoreRange: "9.0-10.0 puntos",
    characteristics: [
      "Mantiene registros detallados y digitalizados de todos sus movimientos",
      "Planifica con meses de anticipación sus obligaciones fiscales",
      "Tiene sistemas automatizados para documentos y facturación",
      "Cumple siempre con los plazos y conoce todas las deducciones",
      "Relación transparente y correcta con Hacienda"
    ],
    advice: "Eres un ejemplo a seguir. Revisa deducciones avanzadas, hasta lo más ordenado puede optimizar más.",
    recommendations: [
      "Explora herramientas de automatización fiscal avanzada",
      "Considera asesoría especializada para optimización de deducciones",
      "Mantén tu excelente sistema pero busca eficiencias adicionales",
      "Podrías ayudar a otras autónomas con tu conocimiento"
    ]
  },
  2: {
    title: "La autónoma precavida",
    emoji: "🛡️",
    description: "Lo llevas bastante bien, aunque buscas asegurarte con ayuda. Siempre vas un paso por delante.",
    scoreRange: "8.0-8.5 puntos",
    characteristics: [
      "Planifica con anticipación pero busca confirmación externa",
      "Busca asesoramiento profesional regularmente",
      "Prefiere la seguridad a la improvisación",
      "Mantiene reservas para imprevistos fiscales",
      "Relación estable pero cautelosa con las obligaciones"
    ],
    advice: "Perfecto enfoque. Considera herramientas que te den aún más control y previsión.",
    recommendations: [
      "Explora herramientas de análisis predictivo fiscal",
      "Mantén tu asesoría pero añade tecnología de apoyo",
      "Considera seguros y coberturas adicionales",
      "Tu precaución es una fortaleza, úsala para crecer"
    ]
  },
  3: {
    title: "La autónoma apurada",
    emoji: "⏰",
    description: "Todo lo haces a última hora, pero cumples. Tu vida es un sprint cada trimestre.",
    scoreRange: "6.5-7.5 puntos",
    characteristics: [
      "Trabaja bajo presión en fechas límite",
      "Experimenta estrés durante períodos fiscales",
      "Logra cumplir pero con mucho esfuerzo de última hora",
      "Necesita recordatorios constantes para no olvidar plazos",
      "Relación de amor-odio con Hacienda"
    ],
    advice: "Ten tu 'caja de impuestos': separa un % fijo de cada ingreso y olvídate de sustos.",
    recommendations: [
      "Implementa un sistema de separación automática de impuestos",
      "Usa recordatorios y calendarios fiscales automatizados",
      "Considera herramientas que simplifiquen tus procesos",
      "Pon el cronómetro a tu favor y evita recargos"
    ]
  },
  4: {
    title: "La autónoma creativa",
    emoji: "🎨",
    description: "Te centras en lo que te motiva, descuidas lo fiscal. Tienes mil ideas pero la parte fiscal te aburre.",
    scoreRange: "5.0-6.0 puntos",
    characteristics: [
      "Prioriza la creatividad sobre la administración",
      "Tiene múltiples proyectos en paralelo",
      "Ve lo fiscal como una distracción de su trabajo real",
      "Busca soluciones simples y rápidas para lo administrativo",
      "Prefiere delegar o automatizar todo lo posible"
    ],
    advice: "Automatiza lo máximo posible para centrarte en crear sin preocupaciones.",
    recommendations: [
      "Implementa sistemas automatizados de facturación",
      "Usa herramientas que requieran mínima intervención manual",
      "Considera un asistente virtual para tareas administrativas",
      "Enfócate en tu talento, delega el resto"
    ]
  },
  5: {
    title: "La autónoma improvisada",
    emoji: "🎯",
    description: "Vas aprendiendo sobre la marcha, con tropiezos. Te lanzaste sin plan pero te adaptas.",
    scoreRange: "3.5-4.5 puntos",
    characteristics: [
      "Aprende de la experiencia práctica (a veces dolorosa)",
      "Se adapta rápidamente a los cambios y errores",
      "Comete errores pero los corrige sobre la marcha",
      "Tiene mentalidad de crecimiento pero falta estructura",
      "Relación tensa con las obligaciones fiscales"
    ],
    advice: "Tu capacidad de adaptación es genial. Ahora toca estructurar un poco más.",
    recommendations: [
      "Implementa gradualmente sistemas más estructurados",
      "Mantén tu flexibilidad pero añade organización básica",
      "Busca formación práctica en gestión fiscal",
      "Convierte tus errores en aprendizaje sistemático"
    ]
  },
  6: {
    title: "La autónoma pasota",
    emoji: "😅",
    description: "Pura evasión del tema fiscal. Vives al día, procrastinas, ignoras el tema hasta que explota.",
    scoreRange: "2.5-3.0 puntos",
    characteristics: [
      "Evita activamente pensar en temas fiscales",
      "Procrastina sistemáticamente las tareas administrativas",
      "Se siente completamente abrumada por la burocracia",
      "Prefiere enfocarse solo en su trabajo creativo",
      "Relación de pánico total con Hacienda"
    ],
    advice: "Déjalo en manos de alguien que sí lo mire (nosotros 👋).",
    recommendations: [
      "Busca asesoría profesional integral URGENTE",
      "Delega completamente la gestión fiscal",
      "Enfócate en lo que mejor sabes hacer",
      "No te agobies, hay solución para todo"
    ]
  }
};

// FUNCIÓN PARA CALCULAR LA PUNTUACIÓN EXACTA CON EL NUEVO SISTEMA
const calculateScore = (answers: Answer[]): number => {
  const questionScores = [
    { A: 2.0, B: 1.0, C: 0.5 },  // Pregunta 1
    { A: 2.0, B: 1.5, C: 0.5 },  // Pregunta 2
    { A: 2.0, B: 1.0, C: 0.5 },  // Pregunta 3
    { A: 2.0, B: 1.5, C: 0.5 },  // Pregunta 4
    { A: 2.0, B: 1.0, C: 0.5 }   // Pregunta 5
  ];
  
  return answers.reduce((sum, answer, index) => sum + questionScores[index][answer], 0);
};

// FUNCIÓN PARA OBTENER EL COLOR DE LA PUNTUACIÓN
const getScoreColor = (score: number): string => {
  if (score >= 9.0) return 'text-green-600';
  if (score >= 8.0) return 'text-blue-600';
  if (score >= 6.5) return 'text-indigo-600';
  if (score >= 5.0) return 'text-purple-600';
  if (score >= 3.5) return 'text-orange-600';
  return 'text-red-600';
};

// FUNCIÓN PARA OBTENER EL MENSAJE DE EVALUACIÓN
const getEvaluationMessage = (score: number): string => {
  if (score >= 9.0) return '¡Excelente nivel de organización fiscal!';
  if (score >= 8.0) return 'Muy buen nivel de planificación y precaución';
  if (score >= 6.5) return 'Buen nivel pero con tendencia a la urgencia';
  if (score >= 5.0) return 'Enfoque creativo que necesita más estructura';
  if (score >= 3.5) return 'Necesitas apoyo para mejorar tu organización';
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
                      {score.toFixed(1)}
                    </span>
                    <span className="text-2xl text-gray-500">/10.0</span>
                  </div>
                  <p className="text-sm text-gray-600">Puntuación obtenida</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-semibold ${scoreColor} mb-1`}>
                    {profile.scoreRange}
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