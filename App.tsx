import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import OpeningModal from './components/OpeningModal';
import Timer from './components/Timer';
import QuestionPanel from './components/QuestionPanel';
import NavigationPanel from './components/NavigationPanel';
import ScoreModal from './components/ScoreModal';
import { useTimer } from './hooks/useTimer';
import { calculateScore } from './utils/scoreCalculator';
import { quizData } from './data/quizData';
import { ScoreResult } from './types/quiz';

function App() {
  const [showOpeningModal, setShowOpeningModal] = useState(true);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    new Array(quizData.length).fill(null)
  );
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  const handleTimeUp = useCallback(() => {
    finishQuiz();
  }, []);

  const { timeLeft, start: startTimer, reset: resetTimer } = useTimer(100 * 60, handleTimeUp);

  const startQuiz = () => {
    setShowOpeningModal(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quizData.length).fill(null));
    resetTimer(100 * 60);
    startTimer();
  };

  const finishQuiz = () => {
    const result = calculateScore(quizData, userAnswers);
    setScoreResult(result);
    setShowScoreModal(true);
  };

  const restartQuiz = () => {
    setShowOpeningModal(true);
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(quizData.length).fill(null));
    setScoreResult(null);
    resetTimer();
  };

  const selectAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const downloadPDF = () => {
    // Placeholder for PDF generation
    alert('Fitur download PDF akan segera tersedia!');
  };

  const answeredCount = userAnswers.filter(a => a !== null).length;
  const progress = (answeredCount / quizData.length) * 100;

  if (showOpeningModal) {
    return <OpeningModal onStartExam={startQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-500">Simulasi Tes CPNS</h1>
          <p className="text-gray-500">Computer Assisted Test - Sistem Seleksi CPNS</p>
        </header>

        {/* Info Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
          <Timer timeLeft={timeLeft} />

          <div className="flex-grow md:flex-grow-0 flex items-center space-x-6 text-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{quizData.length}</div>
              <div className="text-xs text-gray-500">Total Soal</div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 h-5 w-5" />
              <div className="text-left">
                <div className="text-2xl font-bold">{answeredCount}</div>
                <div className="text-xs text-green-500 font-semibold">Dijawab</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="text-red-500 h-5 w-5" />
              <div className="text-left">
                <div className="text-2xl font-bold">{quizData.length - answeredCount}</div>
                <div className="text-xs text-red-500 font-semibold">Belum Dijawab</div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto md:flex-grow-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">Progress Pengerjaan</span>
              <span className="text-xs font-semibold text-blue-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={finishQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-300"
            >
              Selesai
            </button>
            <button 
              onClick={restartQuiz}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition duration-300"
            >
              Ulang
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <QuestionPanel
            question={quizData[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onSelectAnswer={selectAnswer}
            onNext={handleNext}
            onSkip={handleNext}
          />

          <NavigationPanel
            totalQuestions={quizData.length}
            currentQuestion={currentQuestionIndex}
            userAnswers={userAnswers}
            onJumpToQuestion={jumpToQuestion}
          />
        </div>
      </div>

      {showScoreModal && scoreResult && (
        <ScoreModal
          scoreResult={scoreResult}
          onRestart={restartQuiz}
          onDownload={downloadPDF}
        />
      )}
    </div>
  );
}

export default App;