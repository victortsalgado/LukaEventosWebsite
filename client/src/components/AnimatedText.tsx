import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-primary-gray font-extrabold tracking-wide animate-glow-pulse">
        {children}
      </span>
      <span 
        className="absolute inset-0 text-primary-gray opacity-10 blur-md"
        aria-hidden="true"
        style={{
          textShadow: '0 0 15px rgba(61, 72, 82, 0.8), 0 0 30px rgba(61, 72, 82, 0.4)'
        }}
      >
        {children}
      </span>
    </span>
  );
}