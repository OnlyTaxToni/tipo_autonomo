import React, { useState } from 'react';
import { Mail, RefreshCw } from 'lucide-react';
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
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentResult = results[result];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Contar respuestas para estadísticas
    const counts = { A: 0, B: 0, C: 0 };
    answers.forEach(answer => {
      counts[answer]++;
    });

    // Simular guardado de datos
    const data = {
      email,
      result: result,
      timestamp: new Date().toISOString(),
      answerCounts: counts
    };

    console.log('Guardando datos:', data);

    // Simular envío de email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
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

        </div>

        {/* Captura de email */}
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <p className="text-lg text-gray-700 leading-relaxed">
                Déjanos tu email y recibe tu sorpresa 🎁 + acceso a nuestra newsletter con consejos y recursos útiles para creadoras digitales
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={!email || isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enviando...
                  </span>
                ) : (
                  'No me lo pierdo, mándamelo ya'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Usaremos tu email para enviarte el resultado y consejos útiles. Podrás darte de baja cuando quieras.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmación */
          <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 text-center">
            <div className="text-6xl mb-4">📬</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              ¡Listo!
            </h3>
            <p className="text-lg text-green-700 mb-6">
              Te acabamos de enviar tu resultado. Revisa tu bandeja (o el spam por si acaso).
            </p>
            
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Hacer el quiz otra vez
            </button>
          </div>
        )}
      </div>
    </div>
  );
}