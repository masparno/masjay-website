import React from 'react';
import { QuizQuestion } from '../types/quiz';

interface QuestionPanelProps {
  question: QuizQuestion;
  questionIndex: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onSkip: () => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  questionIndex,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onSkip
}) => {
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  const optionsData = Array.isArray(question.options) && question.options.length > 0 && typeof question.options[0] === 'object'
    ? (question.options as any[]).map(opt => opt.text)
    : question.options as string[];

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 flex flex-col">
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Soal No. {questionIndex + 1} ({question.category})
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">{question.question}</p>
        <div className="space-y-3">
          {optionsData.map((option, i) => {
            const isSelected = selectedAnswer === option;
            return (
              <div
                key={i}
                onClick={() => onSelectAnswer(option)}
                className={`p-3 rounded-lg cursor-pointer flex items-center space-x-4 border-2 transition-all duration-200 hover:border-blue-300 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="border-2 border-gray-400 rounded-md w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold text-gray-600">
                  {optionLetters[i]}
                </div>
                <div className="text-gray-700">{option}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t mt-6 pt-4 flex justify-end space-x-4">
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition duration-300"
        >
          Simpan dan Lanjutkan
        </button>
        <button
          onClick={onSkip}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-lg transition duration-300"
        >
          Lewatkan Soal Ini
        </button>
      </div>
    </div>
  );
};

export default QuestionPanel;