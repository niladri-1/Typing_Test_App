'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTypingTest } from '@/hooks/use-typing-test';
import { TestControls } from './TestControls';
import { WordDisplay } from './WordDisplay';
import { ProgressBar } from './ProgressBar';
import { TestResults } from './TestResults';
import { Badge } from '@/components/ui/badge';
import { calculateWPM } from '@/lib/test-utils';

export function TypingTest() {
  const {
    settings,
    testState,
    results,
    updateSettings,
    handleInputChange,
    resetTest,
    finishTest,
  } = useTypingTest();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [liveWPM, setLiveWPM] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(true);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [testState.status === 'idle']);
  
  useEffect(() => {
    if (
      testState.status === 'running' &&
      settings.showLiveWPM &&
      testState.startTime !== null
    ) {
      const elapsedSeconds = (Date.now() - testState.startTime) / 1000;
      if (elapsedSeconds > 0) {
        const wpm = calculateWPM(testState.correctCharCount, elapsedSeconds);
        setLiveWPM(wpm);
      }
    } else if (testState.status !== 'running') {
      setLiveWPM(null);
    }
  }, [testState, settings.showLiveWPM]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    
    if (e.key === 'Escape' && testState.status !== 'running') {
      resetTest();
    }
  }, [resetTest, testState.status]);
  
  const handleFocusLoss = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  }, []);
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {testState.status !== 'finished' ? (
        <>
          <TestControls
            settings={settings}
            onUpdateSettings={updateSettings}
            onReset={resetTest}
            disabled={testState.status === 'running'}
          />
          
          <ProgressBar
            settings={settings}
            elapsedTime={testState.elapsedTime}
            currentWordIndex={testState.currentWordIndex}
            status={testState.status}
          />
          
          {settings.showLiveWPM && liveWPM !== null && (
            <div className="text-center mb-2">
              <Badge variant="outline" className="text-sm font-medium">
                {liveWPM} WPM
              </Badge>
            </div>
          )}
          
          <WordDisplay
            wordList={testState.wordList}
            currentWordIndex={testState.currentWordIndex}
            currentInput={testState.currentInput}
            currentErrors={testState.currentErrors}
            isFocused={isFocused}
            onFocus={handleFocus}
          />
          
          <div className="w-full max-w-lg mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={testState.currentInput}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleFocusLoss}
              className="w-full h-12 px-4 bg-background border-none rounded-none text-xl caret-primary font-mono focus:outline-none focus:ring-0 opacity-0"
              placeholder={testState.status === 'idle' ? 'Type to begin...' : ''}
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        </>
      ) : (
        results && <TestResults results={results} onReset={resetTest} />
      )}
    </div>
  );
}