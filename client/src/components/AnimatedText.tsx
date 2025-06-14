import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span 
        className="text-primary-gray font-extrabold tracking-wide animated-text-effect"
        style={{
          background: 'linear-gradient(90deg, #3d4852, #6b7280, #3d4852)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'wave-text 3s ease-in-out infinite'
        }}
      >
        {children}
      </span>
    </span>
  );
}