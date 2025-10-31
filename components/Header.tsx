
import React from 'react';
import { SparklesIcon } from './Icons';

export function Header() {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center bg-gradient-to-r from-primary to-secondary p-3 rounded-full shadow-lg mb-4">
        <SparklesIcon className="w-8 h-8 text-white"/>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Lovable AI Prompt Crafter
      </h1>
      <p className="mt-3 text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
        Design your perfect AI companion. Fill out the details below, and we'll craft a unique personality prompt for your model.
      </p>
    </header>
  );
}
