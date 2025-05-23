'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TestResults as TestResultsType } from '@/types';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, RotateCcw, Share2 } from 'lucide-react';
import { formatTime } from '@/lib/test-utils';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

interface TestResultsProps {
  results: TestResultsType;
  onReset: () => void;
}

export function TestResults({ results, onReset }: TestResultsProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const handleShare = () => {
    const text = `I just scored ${results.wpm} WPM with ${results.accuracy}% accuracy on TypeTest!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My TypeTest Results',
        text: text,
      }).catch(() => {
        // Fallback if share fails
        copyToClipboard(text);
      });
    } else {
      copyToClipboard(text);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Results copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy results');
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xl mx-auto bg-card rounded-xl p-8 shadow-md"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-bold text-center mb-6"
      >
        Test Results
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        <motion.div
          variants={itemVariants}
          className="text-center p-4 bg-card rounded-lg border"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Typing Speed</h3>
          <p className="text-4xl font-bold">{results.wpm}</p>
          <p className="text-sm text-muted-foreground">WPM</p>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="text-center p-4 bg-card rounded-lg border"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Accuracy</h3>
          <p className="text-4xl font-bold">{results.accuracy}</p>
          <p className="text-sm text-muted-foreground">%</p>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <Separator className="my-6" />
      </motion.div>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
        <motion.div variants={itemVariants} className="flex justify-between">
          <span className="text-sm text-muted-foreground">Time</span>
          <span className="text-sm font-medium">{formatTime(Math.round(results.duration))}</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-between">
          <span className="text-sm text-muted-foreground">Words</span>
          <span className="text-sm font-medium">{results.wordsTyped}</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-between">
          <span className="text-sm text-muted-foreground">Correct Characters</span>
          <span className="text-sm font-medium">{results.correctChars}</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-between">
          <span className="text-sm text-muted-foreground">Incorrect Characters</span>
          <span className="text-sm font-medium">{results.incorrectChars}</span>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants} className="flex space-x-4 justify-center">
        <Button onClick={onReset} className="flex items-center space-x-2">
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        
        <Button onClick={handleShare} variant="outline" className="flex items-center space-x-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}