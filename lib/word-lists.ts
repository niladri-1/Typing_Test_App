// Common words for the typing test
export const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
];

// Programming words for a specialized typing test
export const programmingWords = [
  'function', 'variable', 'const', 'let', 'class', 'object', 'array', 'string',
  'number', 'boolean', 'null', 'undefined', 'interface', 'type', 'import', 'export',
  'async', 'await', 'promise', 'callback', 'component', 'props', 'state', 'hook',
  'effect', 'router', 'redux', 'context', 'provider', 'consumer', 'middleware', 'api',
  'fetch', 'axios', 'request', 'response', 'server', 'client', 'database', 'query',
  'schema', 'model', 'migration', 'typescript', 'javascript', 'react', 'vue', 'angular',
  'node', 'express', 'mongodb', 'postgresql', 'mysql', 'docker', 'kubernetes', 'git',
  'commit', 'branch', 'merge', 'pull', 'push', 'conflict', 'repository', 'clone'
];

// Generate a random word list for tests
export const generateWordList = (
  wordCount: number,
  wordList: string[] = commonWords
): string[] => {
  const result: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    result.push(wordList[randomIndex]);
  }
  
  return result;
};

// Generate quote paragraphs for tests
export const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "All that glitters is not gold; all that wanders is not lost.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
  "It is never too late to be what you might have been.",
  "Life is what happens to us while we are making other plans.",
  "The future belongs to those who believe in the beauty of their dreams."
];