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
    // Calcular puntuación directa
    const scoreMap = { A: 2, B: 1, C: 0.5 };
    const totalScore = quizState.answers.reduce((sum, answer) => sum + scoreMap[answer], 0);
    
    let result: 1 | 2 | 3 | 4 | 5 | 6;
    
    // Asignar resultado basado en puntuación directa
    // Rangos: 2.5 (mínimo) a 10 (máximo)
    if (totalScore >= 9) {
      result = 1; // Autónoma organizada (9-10 puntos)
    } else if (totalScore >= 7.5) {
      result = 5; // Autónoma precavida (7.5-8.5 puntos)
    } else if (totalScore >= 6) {
      result = 2; // Autónoma apurada (6-7 puntos)
    } else if (totalScore >= 4.5) {
      result = 4; // Autónoma creativa (4.5-5.5 puntos)
    } else if (totalScore >= 3) {
      result = 6; // Autónoma improvisada (3.5-4 puntos)
    } else {
      result = 3; // Autónoma pasota (2.5-3 puntos)
    }

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