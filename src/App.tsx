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
    // SISTEMA DE PUNTUACIÓN RECALIBRADO - SOLO MÚLTIPLOS DE 0.5
    // Diseñado para distribución perfecta en los 6 rangos obligatorios
    const questionScores = [
      // Pregunta 1: Gestión de facturas - Organización fundamental
      { A: 2.0, B: 1.0, C: 0.5 },  // Máxima organización vs básica vs mínima
      // Pregunta 2: Presentación de impuestos - Planificación
      { A: 2.0, B: 1.5, C: 0.5 },  // Preparación vs último momento vs delegación
      // Pregunta 3: Trabajo con marcas extranjeras - Conocimiento especializado
      { A: 2.0, B: 1.0, C: 0.5 },  // Investigación vs improvisación vs evasión
      // Pregunta 4: Tickets de gastos - Control de deducciones
      { A: 2.0, B: 1.5, C: 0.5 },  // Archivo meticuloso vs acumulación vs pérdida
      // Pregunta 5: Relación con Hacienda - Cumplimiento fiscal
      { A: 2.0, B: 1.0, C: 0.5 }   // Correcta vs conflictiva vs problemática
    ];

    let totalScore = 0;
    quizState.answers.forEach((answer, index) => {
      totalScore += questionScores[index][answer];
    });

    // RANGOS EXACTOS CON INCREMENTOS DE 0.5 - SIN SOLAPAMIENTOS
    let result: 1 | 2 | 3 | 4 | 5 | 6;
    
    if (totalScore >= 9.0) {
      result = 1; // 🗂️ Autónoma organizada (9.0-10.0)
    } else if (totalScore >= 8.0) {
      result = 2; // 🛡️ Autónoma precavida (8.0-8.5)
    } else if (totalScore >= 6.5) {
      result = 3; // ⏰ Autónoma apurada (6.5-7.5)
    } else if (totalScore >= 5.0) {
      result = 4; // 🎨 Autónoma creativa (5.0-6.0)
    } else if (totalScore >= 3.5) {
      result = 5; // 🎯 Autónoma improvisada (3.5-4.5)
    } else {
      result = 6; // 😅 Autónoma pasota (2.5-3.0)
    }

    console.log(`🔍 SISTEMA DE PUNTUACIÓN CORREGIDO (INCREMENTOS 0.5):`);
    console.log(`   Respuestas: ${quizState.answers.join(', ')}`);
    console.log(`   Puntuación total: ${totalScore.toFixed(1)}/10.0`);
    console.log(`   Resultado asignado: ${result}`);
    console.log(`   Perfil: ${
      result === 1 ? '🗂️ Autónoma organizada (9.0-10.0)' :
      result === 2 ? '🛡️ Autónoma precavida (8.0-8.5)' :
      result === 3 ? '⏰ Autónoma apurada (6.5-7.5)' :
      result === 4 ? '🎨 Autónoma creativa (5.0-6.0)' :
      result === 5 ? '🎯 Autónoma improvisada (3.5-4.5)' :
      '😅 Autónoma pasota (2.5-3.0)'
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