
import React from 'react';

interface PersonalityTraitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PersonalityTraitCard({ icon, title, description, children }: PersonalityTraitCardProps) {
  return (
    <div className="bg-card-bg dark:bg-dark-card-bg p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/50">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">{title}</h2>
          <p className="mt-1 text-sm text-text-secondary dark:text-dark-text-secondary">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex-grow">
        {children}
      </div>
    </div>
  );
}
