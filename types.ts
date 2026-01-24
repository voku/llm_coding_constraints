export enum EraType {
  INTRO = 'INTRO',
  IMPORTANT_REALIZATION = 'IMPORTANT_REALIZATION',
  MARKOV = 'MARKOV',
  SHANNON = 'SHANNON', // Secret
  PERCEPTRON = 'PERCEPTRON',
  AI_WINTER = 'AI_WINTER', // Secret
  BACKPROP = 'BACKPROP', // Secret
  LSTM = 'LSTM',
  ATTENTION = 'ATTENTION', // Secret
  TRANSFORMER = 'TRANSFORMER',
  GENERALIZATION = 'GENERALIZATION',
  HALLUCINATION = 'HALLUCINATION', // Secret
  GIT_HISTORY = 'GIT_HISTORY',
  BAD_APPROACH = 'BAD_APPROACH',
  SOLUTION = 'SOLUTION',
  MISSING_CONTEXT = 'MISSING_CONTEXT',
  ACTION = 'ACTION'
}

export interface Era {
  id: EraType;
  year: string;
  title: string;
  subtitle: string;
  content: string[]; // Array of paragraphs
  codeSnippet?: string;
  codeLanguage?: string;
  visualType: 'illustration' | 'code' | 'diagram' | 'text-highlight' | 'glitch' | 'frozen' | 'warning' | 'list' | 'contract' | 'casino' | 'gradient' | 'heatmap';
  highlightPhrase?: string;
  isSecret?: boolean; // New flag
}