import { QuizQuestion, ScoreResult } from '../types/quiz';

export const calculateScore = (
  questions: QuizQuestion[],
  userAnswers: (string | null)[]
): ScoreResult => {
  let twkScore = 0;
  let tiuScore = 0;
  let tkpScore = 0;

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    if (!userAnswer) return;

    if (question.category === 'TWK' || question.category === 'TIU') {
      if (userAnswer === question.answer) {
        if (question.category === 'TWK') {
          twkScore += 5;
        } else {
          tiuScore += 5;
        }
      }
    } else if (question.category === 'TKP') {
      const options = question.options as any[];
      const selectedOption = options.find(opt => opt.text === userAnswer);
      if (selectedOption) {
        tkpScore += selectedOption.score;
      }
    }
  });

  const total = twkScore + tiuScore + tkpScore;
  const isPass = twkScore >= 65 && tiuScore >= 80 && tkpScore >= 166;

  return {
    twk: twkScore,
    tiu: tiuScore,
    tkp: tkpScore,
    total,
    isPass
  };
};