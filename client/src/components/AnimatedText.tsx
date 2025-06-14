import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className = "" }: AnimatedTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="text-primary-gray font-extrabold tracking-wide" style={{
        textShadow: '0 0 8px rgba(61, 72, 82, 0.4), 0 0 16px rgba(61, 72, 82, 0.2)'
      }}>
        {children}
      </span>
    </span>
  );
}