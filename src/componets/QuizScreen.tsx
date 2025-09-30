import React from 'react';
import { Check } from 'lucide-react';
import type { Answer } from '../scoring';

interface Question {
  id: number;
  text: string;
  emoji: string;
  options: {
    value: Answer;
    text: string;
  }[];
}

// PREGUNTAS RECALIBRADAS PARA DISTRIBUCIÓN PERFECTA
const questions: Question[] = [
  {
    id: 1,
    text: "¿Cómo gestionas tus facturas?",
    emoji: "📂",
    options: [
      { 
        value: 'A', 
        text: 'Tengo un sistema ordenado y digitalizado.'
      },
      { 
        value: 'B', 
        text: 'Las guardo como puedo, sin mucho control.'
      },
      { 
        value: 'C', 
        text: 'Prefiero no pensarlo demasiado.'
      }
    ]
  },
  {
    id: 2,
    text: "Cuando toca presentar impuestos…",
    emoji: "🧾",
    options: [
      { 
        value: 'A', 
        text: 'Ya lo tengo todo preparado con antelación.'
      },
      { 
        value: 'B', 
        text: 'Lo dejo para el último momento pero lo hago.'
      },
      { 
        value: 'C', 
        text: 'Prefiero que alguien lo haga por mí.'
      }
    ]
  },
  {
    id: 3,
    text: "Si trabajas con una marca extranjera…",
    emoji: "🌍",
    options: [
      { 
        value: 'A', 
        text: 'Investigo bien qué retenciones aplicar.'
      },
      { 
        value: 'B', 
        text: 'Facturo igual y confío en la suerte.'
      },
      { 
        value: 'C', 
        text: 'ChatGPT es mi asesoría de confianza.'
      }
    ]
  },
  {
    id: 4,
    text: "¿Qué pasa con tus tickets de gastos?",
    emoji: "🧾",
    options: [
      { 
        value: 'A', 
        text: 'Los archivo meticulosamente para deducirlos.'
      },
      { 
        value: 'B', 
        text: 'Los acumulo sin orden pero los tengo.'
      },
      { 
        value: 'C', 
        text: 'Desaparecen misteriosamente.'
      }
    ]
  },
  {
    id: 5,
    text: "Tu relación con Hacienda es…",
    emoji: "🏛️",
    options: [
      { 
        value: 'A', 
        text: 'Correcta y transparente, nos entendemos.'
      },
      { 
        value: 'B', 
        text: 'De amor-odio: más odio que amor.'
      },
      { 
        value: 'C', 
        text: 'Tensa: nunca sé si voy a salir viva.'
      }
    ]
  }
];

interface QuizScreenProps {
  answers: Answer[];
  onAnswer: (answer: Answer) => void;
  onFinish: () => void;
}

export default function QuizScreen({ answers, onAnswer, onFinish }: QuizScreenProps) {
  const currentQuestionIndex = answers.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((answers.length) / questions.length) * 100;

  const handleAnswer = (answer: Answer) => {
    onAnswer(answer);
    
    // Si es la última pregunta, terminar después de un breve delay
    if (currentQuestionIndex === questions.length - 1) {
      setTimeout(() => {
        onFinish();
      }, 300);
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-2xl font-bold text-indigo-600">Calculando tu resultado...</div>
    </div>;
  }

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
      
      <div className="max-w-3xl mx-auto w-full flex flex-col justify-center min-h-[calc(100vh-6rem)]">
        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% completado
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Pregunta */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="text-5xl md:text-6xl mb-4 animate-bounce">
              {currentQuestion.emoji}
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 px-2">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Opciones */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 md:p-6 text-left border-3 border-gray-200 rounded-2xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 md:space-x-4 flex-1">
                    <div 
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500 transition-all duration-200 flex-shrink-0"
                      style={{ backgroundColor: '#BEBFF7' }}
                    >
                      <span className="font-bold text-white text-sm md:text-base">
                        {option.value}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="text-base md:text-lg lg:text-xl text-gray-700 font-medium block">
                        {option.text}
                      </span>
                    </div>
                  </div>
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}