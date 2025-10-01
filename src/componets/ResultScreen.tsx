import React from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import type { Answer } from '../scoring';
import { calculateScore, classifyProfile, PROFILE_THRESHOLDS, scoreColor as getScoreColor, evaluationMessage as getEvaluationMessage } from '../scoring';

// Mantén tus textos/emoji/characteristics/advice/recommendations:
interface PersonalityProfile {
  title: string;
  emoji: string;
  description: string;
  characteristics: string[];
  advice: string;
  recommendations: string[];
}

const personalityProfiles: Record<1 | 2 | 3 | 4 | 5 | 6, PersonalityProfile> = {
  1: { 
    title: "La autónoma organizada", 
    emoji: "🗂️", 
    description: "Meticulosa, planifica todo, tiene su Excel y las facturas al día. Eres la reina del control fiscal.", 
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
  },
};

interface ResultScreenProps {
  answers: Answer[];
  onRestart: () => void;
}

export default function ResultScreen({ answers, onRestart }: ResultScreenProps) {
  const score = calculateScore(answers);
  const profileId = classifyProfile(score);
  const profile = personalityProfiles[profileId];

  const scoreCls = getScoreColor(score);
  const evaluation = getEvaluationMessage(score);
  const range = PROFILE_THRESHOLDS.find(r => r.id === profileId)!;
  const scoreRange = `${range.min.toFixed(1)}–${range.max.toFixed(1)} puntos`;

  // Debug log para verificar cálculos
  console.log(`🔍 SISTEMA MODULAR DE PUNTUACIÓN:`);
  console.log(`   Respuestas: ${answers.join(', ')}`);
  console.log(`   Puntuación total: ${score.toFixed(1)}/10.0`);
  console.log(`   Perfil ID: ${profileId}`);
  console.log(`   Rango: ${scoreRange}`);
  console.log(`   Perfil: ${profile.title}`);

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

      <div className="max-w-4xl mx-auto w-full flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-12 w-full transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center mb-8">
            {/* Imagen específica para autónoma precavida */}
            {profileId === 2 && (
              <div className="mb-6">
                <img 
                  src="/autonoma precavida.png" 
                  alt="Autónoma precavida trabajando de forma organizada" 
                  className="w-full max-w-sm mx-auto rounded-2xl"
                />
              </div>
            )}
            
            {/* Imagen específica para autónoma organizada */}
            {profileId === 1 && (
              <div className="mb-6">
                <img 
                  src="/autonoma_organizada.png" 
                  alt="Autónoma organizada con sistema perfecto de trabajo" 
                  className="w-full max-w-sm mx-auto rounded-2xl"
                />
              </div>
            )}
            
            {/* Imagen específica para autónoma apurada */}
            {profileId === 3 && (
              <div className="mb-6">
                <img 
                  src="/autonoma_apurada.png" 
                  alt="Autónoma apurada trabajando contra reloj" 
                  className="w-full max-w-sm mx-auto rounded-2xl"
                />
              </div>
            )}
            
            {/* Imagen específica para autónoma creativa */}
            {profileId === 4 && (
              <div className="mb-6">
                <img 
                  src="/autonoma_creativa.png" 
                  alt="Autónoma creativa enfocada en sus proyectos artísticos" 
                  className="w-full max-w-sm mx-auto rounded-2xl"
                />
              </div>
            )}
            
            {/* Imagen específica para autónoma improvisada */}
            {profileId === 5 && (
              <div className="mb-6">
                <img 
                  src="/autonoma_improvisada.png" 
                  alt="Autónoma improvisada aprendiendo sobre la marcha" 
                  className="w-full max-w-sm mx-auto rounded-2xl"
                />
              </div>
            )}
            
            {/* Imagen específica para autónoma pasota */}
            {profileId === 6 && (
              <div className="mb-6">
                <img 
                  src="/autonoma_pasota.png" 
                  alt="Autónoma pasota evitando temas fiscales" 
                  className="w-full max-w-sm mx-auto rounded-2xl"
                />
              </div>
            )}
            
            <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">{profile.emoji}</div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4" style={{ color: '#434C8F' }}>
              {profile.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-6 leading-relaxed px-2">
              {profile.description}
            </p>

            <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-2xl bg-gray-50 border-2 border-gray-200">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">📊 Tu evaluación completa</h3>
              <div className="text-center">
                <p className={`text-base md:text-lg font-medium ${scoreCls} px-2`}>
                {evaluation}
              </p>
              </div>
            </div>

            <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-2xl" style={{ backgroundColor: '#D9DAFA' }}>
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">🎯 Características de tu perfil:</h3>
              <ul className="text-left space-y-2">
                {profile.characteristics.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-sm md:text-base text-gray-700">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">💡 Tu consejo personalizado:</h3>
              <p className="text-sm md:text-lg text-gray-700">{profile.advice}</p>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-green-50 border-2 border-green-200">
              <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">🚀 Recomendaciones para ti:</h3>
              <ul className="text-left space-y-2">
                {profile.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-sm md:text-base text-gray-700">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-6 md:mt-8 space-y-4">
            <a
              href="https://www.onlytax.es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
              Contactar con OnlyTax
            </a>
            
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-bold text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6" />
              Hacer el quiz otra vez
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}