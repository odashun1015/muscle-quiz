export interface Muscle {
  id: string;
  name: string;
  category: 'upper' | 'lower' | 'core' | 'arm' | 'leg';
  view: 'front' | 'back';
  position: { x: number; y: number };
  description: string;
}

export interface QuizSettings {
  questionCount: 5 | 10 | 15 | -1; // -1 for all questions
  category: 'all' | 'upper' | 'lower' | 'core' | 'arm' | 'leg';
  choiceCount: number;
}

export interface QuizQuestion {
  muscle: Muscle;
  choices: string[];
  correctAnswer: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectQuestions: QuizQuestion[];
  score: number;
}

export interface GameState {
  currentScreen: 'title' | 'game' | 'result';
  settings: QuizSettings;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  results: QuizResult;
  selectedAnswer: string | null;
  showAnswer: boolean;
}