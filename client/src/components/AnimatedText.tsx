import React from 'react';

interface AnimatedTextProps {
  className?: string;
}

export default function AnimatedText({ className = "" }: AnimatedTextProps) {
  return (
    <div className={`rotating-text-container ${className}`}>
      <div className="rotating-text-loader">
        <p className="text-white">marco de</p>
        <div className="rotating-words">
          <span className="rotating-word">oportunidades</span>
          <span className="rotating-word">networking</span>
          <span className="rotating-word">impacto</span>
          <span className="rotating-word">crescimento</span>
          <span className="rotating-word">relevância</span>
        </div>
      </div>
    </div>
  );
}