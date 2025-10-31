
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface PromptOutputProps {
  prompt: string;
  isLoading: boolean;
}

export function PromptOutput({ prompt, isLoading }: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
    }
  };

  return (
    <div className="bg-card-bg dark:bg-dark-card-bg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-bold">Generated System Prompt</h3>
        <button
          onClick={handleCopy}
          disabled={!prompt || isLoading}
          className="flex items-center px-3 py-1.5 text-sm font-semibold text-primary bg-primary/10 rounded-md hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {copied ? <CheckIcon className="mr-2" /> : <CopyIcon className="mr-2" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse-fast"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse-fast w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse-fast w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse-fast w-5/6"></div>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-text-secondary dark:text-dark-text-secondary font-sans text-base leading-relaxed">
            {prompt}
          </pre>
        )}
      </div>
    </div>
  );
}
