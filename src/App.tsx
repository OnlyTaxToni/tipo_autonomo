import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

export type Answer = 'A' | 'B' | 'C';

export interface QuizState {
  answers: Answer[];
  currentScreen: 'welcome' | 'quiz' | 'result';
  result: 1 | 2 | 3 | null;
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
    // Calcular resultado basado en mayoría
    const counts = { A: 0, B: 0, C: 0 };
    quizState.answers.forEach(answer => {
      counts[answer]++;
    });

    let result: 1 | 2 | 3;
    
    // Encontrar la opción con más respuestas
    if (counts.A >= counts.B && counts.A >= counts.C) {
      result = 1;
    } else if (counts.B >= counts.C) {
      result = 2;
    } else {
      result = 3;
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
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