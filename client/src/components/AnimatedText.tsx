import React from 'react';

interface AnimatedTextProps {
  className?: string;
}

export default function AnimatedText({ className = "" }: AnimatedTextProps) {
  return (
    <div className={`card ${className}`}>
      <div className="loader">
        <p>marco de</p>
        <span>&nbsp;</span>
        <div className="words">
          <span className="word">oportunidades</span>
          <span className="word">networking</span>
          <span className="word">impacto</span>
          <span className="word">crescimento</span>
          <span className="word">oportunidades</span>
        </div>
      </div>
    </div>
  );
}