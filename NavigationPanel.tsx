import React from 'react';

interface NavigationPanelProps {
  totalQuestions: number;
  currentQuestion: number;
  userAnswers: (string | null)[];
  onJumpToQuestion: (index: number) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  totalQuestions,
  currentQuestion,
  userAnswers,
  onJumpToQuestion
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold border-b pb-2 mb-4">Navigasi Soal</h3>
      <div className="flex justify-around text-xs mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm bg-green-500 mr-1.5"></div>
          Dijawab
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm bg-red-500 mr-1.5"></div>
          Belum
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm bg-blue-500 mr-1.5"></div>
          Aktif
        </div>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-1.5">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isAnswered = userAnswers[index] !== null;
          const isCurrent = index === currentQuestion;
          
          let buttonClass = 'p-1 text-xs rounded-md font-semibold border transition-all duration-200 cursor-pointer ';
          
          if (isCurrent) {
            buttonClass += 'bg-blue-500 text-white border-blue-500 transform scale-110';
          } else if (isAnswered) {
            buttonClass += 'bg-green-500 text-white border-green-500';
          } else {
            buttonClass += 'bg-red-500 text-white border-red-500';
          }
          
          return (
            <button
              key={index}
              onClick={() => onJumpToQuestion(index)}
              className={buttonClass}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationPanel;