
import React from 'react';

const ADJECTIVES = [
  'Friendly', 'Witty', 'Curious', 'Wise',
  'Playful', 'Calm', 'Enthusiastic', 'Formal',
  'Quirky', 'Humble', 'Creative', 'Analytical'
];

interface AdjectiveSelectorProps {
  selectedAdjectives: string[];
  onToggleAdjective: (adjective: string) => void;
}

export function AdjectiveSelector({ selectedAdjectives, onToggleAdjective }: AdjectiveSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ADJECTIVES.map(adjective => {
        const isSelected = selectedAdjectives.includes(adjective);
        return (
          <button
            key={adjective}
            onClick={() => onToggleAdjective(adjective)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full border-2 transition-all duration-200 
              ${isSelected
                ? 'bg-primary border-primary text-white'
                : 'bg-transparent border-gray-300 dark:border-gray-600 text-text-secondary dark:text-dark-text-secondary hover:border-primary hover:text-primary dark:hover:text-primary'
              }
            `}
          >
            {adjective}
          </button>
        );
      })}
    </div>
  );
}
