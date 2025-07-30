export interface QuizOption {
  text: string;
  score?: number;
}

export interface QuizQuestion {
  category: 'TWK' | 'TIU' | 'TKP';
  question: string;
  options: string[] | QuizOption[];
  answer: string;
  pembahasan: string;
}

export interface ScoreResult {
  twk: number;
  tiu: number;
  tkp: number;
  total: number;
  isPass: boolean;
}