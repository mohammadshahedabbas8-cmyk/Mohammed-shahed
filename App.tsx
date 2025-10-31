
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PersonalityTraitCard } from './components/PersonalityTraitCard';
import { AdjectiveSelector } from './components/AdjectiveSelector';
import { PromptOutput } from './components/PromptOutput';
import { generateSystemPrompt } from './services/geminiService';
import type { AIProfile } from './types';
import { RobotIcon, HeartIcon, SpeechBubbleIcon, ShieldIcon, SparklesIcon, WandIcon } from './components/Icons';

export default function App() {
  const [name, setName] = useState<string>('');
  const [personalityAdjectives, setPersonalityAdjectives] = useState<string[]>([]);
  const [coreRole, setCoreRole] = useState<string>('');
  const [communicationStyle, setCommunicationStyle] = useState<string>('');
  const [forbiddenTopics, setForbiddenTopics] = useState<string>('');
  
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleAdjective = (adjective: string) => {
    setPersonalityAdjectives(prev =>
      prev.includes(adjective)
        ? prev.filter(item => item !== adjective)
        : [...prev, adjective]
    );
  };

  const handleGeneratePrompt = useCallback(async () => {
    setIsLoading(true);
    setGeneratedPrompt('');
    setError(null);
    
    const aiProfile: AIProfile = {
      name,
      personalityAdjectives,
      coreRole,
      communicationStyle,
      forbiddenTopics,
    };

    try {
      const prompt = await generateSystemPrompt(aiProfile);
      setGeneratedPrompt(prompt);
    } catch (e) {
      setError('Failed to generate prompt. Please check your API key and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [name, personalityAdjectives, coreRole, communicationStyle, forbiddenTopics]);

  return (
    <div className="min-h-screen font-sans text-text-primary dark:text-dark-text-primary p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* FIX: Corrected self-closing tag on PersonalityTraitCard to properly wrap child content. */}
          <PersonalityTraitCard
            icon={<RobotIcon />}
            title="AI Name"
            description="Give your AI a friendly name. This helps in personalizing the interaction."
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sparky, Nova, Echo"
              className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
            />
          </PersonalityTraitCard>

          {/* FIX: Corrected self-closing tag on PersonalityTraitCard to properly wrap child content. */}
          <PersonalityTraitCard
            icon={<HeartIcon />}
            title="Lovable Personality"
            description="Choose some adjectives that best describe your AI's character."
          >
            <AdjectiveSelector
              selectedAdjectives={personalityAdjectives}
              onToggleAdjective={handleToggleAdjective}
            />
          </PersonalityTraitCard>

          {/* FIX: Corrected self-closing tag on PersonalityTraitCard to properly wrap child content. */}
          <PersonalityTraitCard
            icon={<WandIcon />}
            title="Core Role & Purpose"
            description="What is the main job of your AI? Be specific about its function."
          >
            <textarea
              value={coreRole}
              onChange={(e) => setCoreRole(e.target.value)}
              placeholder="e.g., A helpful assistant for creative writing, a fun trivia game host, a guide for learning new languages."
              className="w-full p-3 h-28 bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
            />
          </PersonalityTraitCard>

          {/* FIX: Corrected self-closing tag on PersonalityTraitCard to properly wrap child content. */}
          <PersonalityTraitCard
            icon={<SpeechBubbleIcon />}
            title="Communication Style"
            description="How should your AI talk? Mention tone, quirks, or specific phrasing."
          >
            <textarea
              value={communicationStyle}
              onChange={(e) => setCommunicationStyle(e.target.value)}
              placeholder="e.g., Uses lots of emojis, speaks in cheerful short sentences, tells a small joke before answering, avoids technical jargon."
              className="w-full p-3 h-28 bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
            />
          </PersonalityTraitCard>
          
          <div className="md:col-span-2">
            {/* FIX: Corrected self-closing tag on PersonalityTraitCard to properly wrap child content. */}
            <PersonalityTraitCard
              icon={<ShieldIcon />}
              title="Boundaries & Rules"
              description="What topics or actions should your AI strictly avoid? This ensures safety and focus."
            >
              <textarea
                value={forbiddenTopics}
                onChange={(e) => setForbiddenTopics(e.target.value)}
                placeholder="e.g., Avoids giving financial advice, refuses to engage in arguments, does not discuss sensitive political topics."
                className="w-full p-3 h-24 bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
              />
            </PersonalityTraitCard>
          </div>
        </main>

        <div className="mt-8 text-center">
            <button
                onClick={handleGeneratePrompt}
                disabled={isLoading}
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-full shadow-lg hover:bg-primary-hover transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Crafting...
                    </>
                ) : (
                    <>
                        <SparklesIcon className="mr-3"/>
                        Generate Lovable Prompt
                    </>
                )}
            </button>
        </div>

        {error && <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-md text-center animate-fade-in">{error}</div>}

        {(generatedPrompt || isLoading) && (
          <div className="mt-8">
            <PromptOutput prompt={generatedPrompt} isLoading={isLoading} />
          </div>
        )}

      </div>
    </div>
  );
}
