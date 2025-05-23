'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TestSettings, TestState, TestResults } from '@/types';
import { generateWordList, quotes } from '@/lib/word-lists';
import { calculateWPM, calculateAccuracy } from '@/lib/test-utils';

const DEFAULT_SETTINGS: TestSettings = {
  mode: 'time',
  timeLimit: 30,
  wordCount: 25,
  punctuation: false,
  numbers: false,
  showLiveWPM: true,
};

const INITIAL_TEST_STATE: TestState = {
  status: 'idle',
  wordList: [],
  currentWordIndex: 0,
  currentInput: '',
  correctCharCount: 0,
  incorrectCharCount: 0,
  startTime: null,
  endTime: null,
  elapsedTime: 0,
  currentErrors: [],
};

export function useTypingTest() {
  const [settings, setSettings] = useState<TestSettings>(DEFAULT_SETTINGS);
  const [testState, setTestState] = useState<TestState>(INITIAL_TEST_STATE);
  const [results, setResults] = useState<TestResults | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalCharactersRef = useRef<number>(0);
  const correctCharactersRef = useRef<number>(0);

  const generateTest = useCallback(() => {
    let wordList: string[];
    
    if (settings.mode === 'quote') {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      wordList = randomQuote.split(' ');
    } else {
      const count = settings.mode === 'words' ? settings.wordCount : 100;
      wordList = generateWordList(count);
    }
    
    totalCharactersRef.current = 0;
    correctCharactersRef.current = 0;
    
    setTestState({
      ...INITIAL_TEST_STATE,
      wordList,
      currentErrors: Array(wordList[0].length).fill(false),
    });
    setResults(null);
  }, [settings]);

  const startTest = useCallback(() => {
    setTestState((prev) => ({
      ...prev,
      status: 'running',
      startTime: Date.now(),
    }));
  }, []);

  useEffect(() => {
    if (testState.status === 'running' && settings.mode === 'time') {
      timerRef.current = setInterval(() => {
        const elapsedTime = testState.startTime ? (Date.now() - testState.startTime) / 1000 : 0;
        
        setTestState((prev) => ({
          ...prev,
          elapsedTime,
        }));
        
        if (elapsedTime >= settings.timeLimit) {
          finishTest();
        }
      }, 100);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testState.status, testState.startTime, settings.mode, settings.timeLimit]);

  const finishTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const endTime = Date.now();
    const startTime = testState.startTime || endTime;
    const duration = (endTime - startTime) / 1000;
    
    const wpm = calculateWPM(correctCharactersRef.current, duration);
    const accuracy = calculateAccuracy(
      correctCharactersRef.current,
      totalCharactersRef.current
    );
    
    const testResults: TestResults = {
      wpm,
      accuracy,
      correctChars: correctCharactersRef.current,
      incorrectChars: totalCharactersRef.current - correctCharactersRef.current,
      duration,
      wordsTyped: testState.currentWordIndex,
    };
    
    setResults(testResults);
    setTestState((prev) => ({
      ...prev,
      status: 'finished',
      endTime,
    }));
  }, [testState.startTime, testState.currentWordIndex]);

  const handleInputChange = useCallback((input: string) => {
    if (testState.status !== 'running') {
      if (input.length > 0) {
        startTest();
      }
      
      setTestState((prev) => ({
        ...prev,
        currentInput: input,
        currentErrors: prev.wordList[0].split('').map((char, i) => {
          if (i >= input.length) return false;
          return char !== input[i];
        }),
      }));
      return;
    }
    
    const currentWord = testState.wordList[testState.currentWordIndex];
    
    if (input.endsWith(' ')) {
      const trimmedInput = input.trimEnd();
      
      // Update character counts for the completed word
      for (let i = 0; i < Math.max(trimmedInput.length, currentWord.length); i++) {
        totalCharactersRef.current++;
        if (i < trimmedInput.length && i < currentWord.length && trimmedInput[i] === currentWord[i]) {
          correctCharactersRef.current++;
        }
      }
      
      const nextWordIndex = testState.currentWordIndex + 1;
      const nextWord = testState.wordList[nextWordIndex];
      
      if (settings.mode === 'words' && nextWordIndex >= settings.wordCount) {
        setTestState((prev) => ({
          ...prev,
          currentWordIndex: nextWordIndex,
          currentInput: '',
        }));
        finishTest();
        return;
      }
      
      setTestState((prev) => ({
        ...prev,
        currentWordIndex: nextWordIndex,
        currentInput: '',
        currentErrors: nextWord ? Array(nextWord.length).fill(false) : [],
      }));
      return;
    }
    
    const errors = currentWord.split('').map((char, i) => {
      if (i >= input.length) return false;
      return char !== input[i];
    });
    
    setTestState((prev) => ({
      ...prev,
      currentInput: input,
      currentErrors: errors,
    }));
  }, [testState, settings, finishTest, startTest]);

  const resetTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    totalCharactersRef.current = 0;
    correctCharactersRef.current = 0;
    generateTest();
  }, [generateTest]);

  const updateSettings = useCallback((newSettings: Partial<TestSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    resetTest();
  }, [resetTest]);

  useEffect(() => {
    generateTest();
  }, [generateTest]);

  return {
    settings,
    testState,
    results,
    updateSettings,
    handleInputChange,
    resetTest,
    finishTest,
  };
}