export const calculateWPM = (
  correctChars: number,
  timeElapsedInSeconds: number
): number => {
  // Average word length is considered to be 5 characters
  const words = correctChars / 5;
  const minutes = timeElapsedInSeconds / 60;
  
  if (minutes === 0) return 0;
  
  return Math.round(words / minutes);
};

export const calculateAccuracy = (
  correctChars: number,
  totalChars: number
): number => {
  if (totalChars === 0) return 0;
  return Math.round((correctChars / totalChars) * 100);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};