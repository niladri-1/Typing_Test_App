import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WordDisplayProps {
  wordList: string[];
  currentWordIndex: number;
  currentInput: string;
  currentErrors: boolean[];
  isFocused: boolean;
  onFocus: () => void;
}

export function WordDisplay({
  wordList,
  currentWordIndex,
  currentInput,
  currentErrors,
  isFocused,
  onFocus,
}: WordDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeWord = activeWordRef.current;
      
      const containerRect = container.getBoundingClientRect();
      const activeWordRect = activeWord.getBoundingClientRect();
      
      if (
        activeWordRect.top < containerRect.top ||
        activeWordRect.bottom > containerRect.bottom ||
        activeWordRect.left < containerRect.left ||
        activeWordRect.right > containerRect.right
      ) {
        const scrollAmount = activeWord.offsetTop - (container.offsetHeight * 0.4);
        container.scrollTo({
          top: scrollAmount > 0 ? scrollAmount : 0,
          behavior: 'smooth'
        });
      }
    }
  }, [currentWordIndex, currentInput]);
  
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        className={cn(
          "w-full bg-background/5 rounded-lg p-8 mb-8 h-64 overflow-hidden transition-all duration-200",
          !isFocused && "blur-sm"
        )}
        style={{ lineHeight: '1.8' }}
      >
        <div className="text-[1.5rem] font-mono tracking-wide transition-all duration-200">
          {wordList.map((word, wordIndex) => {
            const isActive = wordIndex === currentWordIndex;
            const isPast = wordIndex < currentWordIndex;
            
            return (
              <span
                key={`${word}-${wordIndex}`}
                ref={isActive ? activeWordRef : null}
                className={cn(
                  "px-[2px] transition-colors duration-200",
                  isPast && "text-yellow-500/50 dark:text-yellow-400/50",
                  isActive && "bg-primary/5"
                )}
              >
                {isActive ? (
                  <>
                    {word.split('').map((char, charIndex) => {
                      const isTyped = charIndex < currentInput.length;
                      const isCorrect = isTyped && char === currentInput[charIndex];
                      const isError = isTyped && !isCorrect;
                      const isCursor = charIndex === currentInput.length;
                      
                      return (
                        <span
                          key={charIndex}
                          className={cn(
                            "relative transition-all duration-150",
                            isTyped && isCorrect && "text-yellow-500 dark:text-yellow-400",
                            isError && "text-red-500 dark:text-red-400",
                            !isTyped && "text-foreground/20"
                          )}
                        >
                          {char}
                          {isCursor && isFocused && (
                            <span className="absolute inset-0 w-[2px] bg-yellow-500 dark:bg-yellow-400 animate-pulse" />
                          )}
                        </span>
                      );
                    })}
                  </>
                ) : (
                  <span className={cn(
                    "transition-colors duration-200",
                    wordIndex > currentWordIndex ? "text-foreground/20" : ""
                  )}>
                    {word}
                  </span>
                )}
                {" "}
              </span>
            );
          })}
        </div>
      </div>
      
      {!isFocused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Button
            onClick={onFocus}
            size="lg"
            className="text-lg pointer-events-auto"
          >
            Click to focus
          </Button>
        </div>
      )}
    </div>
  );
}