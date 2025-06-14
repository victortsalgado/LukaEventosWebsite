import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-gradient-to-r from-primary-gray via-gray-200 to-primary-gray bg-clip-text text-transparent font-extrabold tracking-wide">
        {children}
      </span>
      <span 
        className="absolute inset-0 text-primary-gray opacity-20 blur-sm animate-glow-pulse"
        aria-hidden="true"
        style={{
          textShadow: '0 0 20px rgba(61, 72, 82, 0.6), 0 0 40px rgba(61, 72, 82, 0.3)'
        }}
      >
        {children}
      </span>
    </span>
  );
}