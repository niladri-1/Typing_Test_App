export interface TestSettings {
  mode: 'time' | 'words' | 'quote';
  timeLimit: number; // in seconds
  wordCount: number;
  punctuation: boolean;
  numbers: boolean;
  showLiveWPM: boolean;
}

export interface TestResults {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  duration: number; // in seconds
  wordsTyped: number;
}

export interface TestState {
  status: 'idle' | 'running' | 'finished';
  wordList: string[];
  currentWordIndex: number;
  currentInput: string;
  correctCharCount: number;
  incorrectCharCount: number;
  startTime: number | null;
  endTime: number | null;
  elapsedTime: number;
  currentErrors: boolean[];
}

export interface ThemeOption {
  id: string;
  name: string;
  primaryColor: string;
  bgColor: string;
}