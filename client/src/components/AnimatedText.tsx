import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-gradient-to-r from-primary-gray via-white to-primary-gray bg-clip-text text-transparent animate-gradient-x">
        {children}
      </span>
      <span 
        className="absolute inset-0 bg-gradient-to-r from-primary-gray via-accent-gray to-primary-gray opacity-30 blur-sm animate-pulse"
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-shimmer"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          backgroundSize: '200px 100%',
          animation: 'shimmer 3s infinite'
        }}
      />
    </span>
  );
}