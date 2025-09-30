import React, { useState } from 'react';
import WelcomeScreen from './componets/WelcomeScreen';
import QuizScreen from './componets/QuizScreen';
import ResultScreen from './componets/ResultScreen';

export type Answer = 'A' | 'B' | 'C';

export interface QuizState {
  answers: Answer[];
  currentScreen: 'welcome' | 'quiz' | 'result';
  result: 1 | 2 | 3 | 4 | 5 | 6 | null;
}

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    answers: [],
    currentScreen: 'welcome',
    result: null
  });

  const startQuiz = () => {
    setQuizState(prev => ({
      ...prev,
      currentScreen: 'quiz',
      answers: [],
      result: null
    }));
  };

  const submitAnswer = (answer: Answer) => {
    setQuizState(prev => ({
      ...prev,
      answers: [...prev.answers, answer]
    }));
  };

  const finishQuiz = () => {
    // SISTEMA DE PUNTUACIÓN COMPLETAMENTE NUEVO
    // Cada respuesta tiene un valor específico diseñado para distribuir correctamente
    const questionScores = [
      // Pregunta 1: Gestión de facturas
      { A: 2.0, B: 1.2, C: 0.4 },  // Organización vs desorganización
      // Pregunta 2: Presentación de impuestos  
      { A: 2.0, B: 0.8, C: 0.6 },  // Preparación vs procrastinación vs delegación
      // Pregunta 3: Trabajo con marcas extranjeras
      { A: 2.0, B: 0.6, C: 0.4 },  // Conocimiento vs improvisación vs ignorancia
      // Pregunta 4: Tickets de gastos
      { A: 2.0, B: 1.0, C: 0.2 },  // Orden vs acumulación vs pérdida
      // Pregunta 5: Relación con Hacienda
      { A: 2.0, B: 1.4, C: 0.4 }   // Correcta vs conflictiva vs tensa
    ];

    let totalScore = 0;
    quizState.answers.forEach((answer, index) => {
      totalScore += questionScores[index][answer];
    });

    // RANGOS EXACTOS OBLIGATORIOS - SIN SOLAPAMIENTOS
    let result: 1 | 2 | 3 | 4 | 5 | 6;
    
    if (totalScore >= 9.0) {
      result = 1; // 🗂️ Autónoma organizada (9.0-10.0)
    } else if (totalScore >= 7.5) {
      result = 2; // 🛡️ Autónoma precavida (7.5-8.9)
    } else if (totalScore >= 6.0) {
      result = 3; // ⏰ Autónoma apurada (6.0-7.4)
    } else if (totalScore >= 4.5) {
      result = 4; // 🎨 Autónoma creativa (4.5-5.9)
    } else if (totalScore >= 3.0) {
      result = 5; // 🎯 Autónoma improvisada (3.0-4.4)
    } else {
      result = 6; // 😅 Autónoma pasota (<3.0)
    }

    console.log(`🔍 SISTEMA DE PUNTUACIÓN RECALIBRADO:`);
    console.log(`   Respuestas: ${quizState.answers.join(', ')}`);
    console.log(`   Puntuación total: ${totalScore.toFixed(1)}/10.0`);
    console.log(`   Resultado asignado: ${result}`);
    console.log(`   Perfil: ${
      result === 1 ? '🗂️ Autónoma organizada (9.0-10.0)' :
      result === 2 ? '🛡️ Autónoma precavida (7.5-8.9)' :
      result === 3 ? '⏰ Autónoma apurada (6.0-7.4)' :
      result === 4 ? '🎨 Autónoma creativa (4.5-5.9)' :
      result === 5 ? '🎯 Autónoma improvisada (3.0-4.4)' :
      '😅 Autónoma pasota (<3.0)'
    }`);

    setQuizState(prev => ({
      ...prev,
      currentScreen: 'result',
      result
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      answers: [],
      currentScreen: 'welcome',
      result: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Círculos flotantes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-purple-300 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-300 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        
        {/* Formas geométricas */}
        <div className="absolute top-60 left-1/4 w-8 h-8 bg-purple-400 opacity-20 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-indigo-400 opacity-30 rotate-12 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
        
        {/* Elementos adicionales para móvil */}
        <div className="absolute top-1/3 right-5 w-10 h-10 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-1/3 left-5 w-8 h-8 bg-indigo-200 opacity-25 animate-pulse" style={{ animationDuration: '3s' }}></div>
      </div>
      
      {quizState.currentScreen === 'welcome' && (
        <WelcomeScreen onStart={startQuiz} />
      )}
      
      {quizState.currentScreen === 'quiz' && (
        <QuizScreen 
          answers={quizState.answers}
          onAnswer={submitAnswer}
          onFinish={finishQuiz}
        />
      )}
      
      {quizState.currentScreen === 'result' && quizState.result && (
        <ResultScreen 
          result={quizState.result}
          answers={quizState.answers}
          onRestart={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;