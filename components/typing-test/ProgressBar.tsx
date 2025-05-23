'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { formatTime } from '@/lib/test-utils';
import { TestSettings } from '@/types';

interface ProgressBarProps {
  settings: TestSettings;
  elapsedTime: number;
  currentWordIndex: number;
  status: 'idle' | 'running' | 'finished';
}

export function ProgressBar({
  settings,
  elapsedTime,
  currentWordIndex,
  status,
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (status === 'idle') {
      setProgress(0);
      return;
    }
    
    if (status === 'finished') {
      setProgress(100);
      return;
    }
    
    if (settings.mode === 'time') {
      const percentage = Math.min((elapsedTime / settings.timeLimit) * 100, 100);
      setProgress(percentage);
    } else if (settings.mode === 'words') {
      const percentage = Math.min((currentWordIndex / settings.wordCount) * 100, 100);
      setProgress(percentage);
    } else {
      // Quote mode
      setProgress(0);
    }
  }, [elapsedTime, currentWordIndex, settings, status]);
  
  // Display remaining time or words
  const getProgressLabel = () => {
    if (status === 'idle') {
      if (settings.mode === 'time') {
        return `${settings.timeLimit}s`;
      } else if (settings.mode === 'words') {
        return `0/${settings.wordCount} words`;
      }
      return 'Ready';
    }
    
    if (status === 'finished') {
      return 'Completed';
    }
    
    if (settings.mode === 'time') {
      const remaining = Math.max(settings.timeLimit - elapsedTime, 0);
      return formatTime(Math.ceil(remaining));
    } else if (settings.mode === 'words') {
      return `${currentWordIndex}/${settings.wordCount} words`;
    }
    
    return formatTime(Math.floor(elapsedTime));
  };
  
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{getProgressLabel()}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}