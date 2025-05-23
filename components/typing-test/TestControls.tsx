'use client';

import { useState } from 'react';
import { TestSettings } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, Hash, Quote, RotateCcw } from 'lucide-react';

interface TestControlsProps {
  settings: TestSettings;
  onUpdateSettings: (settings: Partial<TestSettings>) => void;
  onReset: () => void;
  disabled: boolean;
}

export function TestControls({ 
  settings, 
  onUpdateSettings, 
  onReset,
  disabled 
}: TestControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleModeChange = (mode: 'time' | 'words' | 'quote') => {
    onUpdateSettings({ mode });
  };
  
  const handleTimeLimitChange = (value: string) => {
    onUpdateSettings({ timeLimit: parseInt(value) });
  };
  
  const handleWordCountChange = (value: string) => {
    onUpdateSettings({ wordCount: parseInt(value) });
  };
  
  return (
    <div className="w-full max-w-lg mx-auto mb-6 bg-card rounded-lg p-4 shadow-sm transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <Button
            variant={settings.mode === 'time' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('time')}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            <span>Time</span>
          </Button>
          <Button
            variant={settings.mode === 'words' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('words')}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Hash className="h-4 w-4" />
            <span>Words</span>
          </Button>
          <Button
            variant={settings.mode === 'quote' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('quote')}
            disabled={disabled}
            className="flex items-center gap-2"
          >
            <Quote className="h-4 w-4" />
            <span>Quote</span>
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          disabled={disabled}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs text-muted-foreground"
      >
        {isExpanded ? 'Hide options' : 'More options'}
      </Button>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
          {settings.mode === 'time' && (
            <div>
              <Label htmlFor="time-limit">Time limit</Label>
              <Select
                disabled={disabled}
                value={settings.timeLimit.toString()}
                onValueChange={handleTimeLimitChange}
              >
                <SelectTrigger id="time-limit" className="mt-1">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="120">2 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {settings.mode === 'words' && (
            <div>
              <Label htmlFor="word-count">Word count</Label>
              <Select
                disabled={disabled}
                value={settings.wordCount.toString()}
                onValueChange={handleWordCountChange}
              >
                <SelectTrigger id="word-count" className="mt-1">
                  <SelectValue placeholder="Select count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 words</SelectItem>
                  <SelectItem value="25">25 words</SelectItem>
                  <SelectItem value="50">50 words</SelectItem>
                  <SelectItem value="100">100 words</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch
              id="punctuation"
              checked={settings.punctuation}
              onCheckedChange={(checked) => onUpdateSettings({ punctuation: checked })}
              disabled={disabled}
            />
            <Label htmlFor="punctuation">Include punctuation</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="numbers"
              checked={settings.numbers}
              onCheckedChange={(checked) => onUpdateSettings({ numbers: checked })}
              disabled={disabled}
            />
            <Label htmlFor="numbers">Include numbers</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="live-wpm"
              checked={settings.showLiveWPM}
              onCheckedChange={(checked) => onUpdateSettings({ showLiveWPM: checked })}
              disabled={disabled}
            />
            <Label htmlFor="live-wpm">Show live WPM</Label>
          </div>
        </div>
      )}
    </div>
  );
}