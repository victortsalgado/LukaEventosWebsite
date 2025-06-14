import { Calendar } from "lucide-react";

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function AnimatedButton({ onClick, children, icon }: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      className="animated-btn group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-primary-gray to-accent-gray px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg"
    >
      {/* Background gradient */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary-gray via-accent-gray to-primary-gray"></span>
      
      {/* Shimmer effect */}
      <span className="shimmer absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full transform transition-transform duration-700 group-hover:translate-x-full"></span>
      
      {/* Glow effect */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-gray/50 to-accent-gray/50 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60"></span>
      
      {/* Button content */}
      <span className="relative flex items-center gap-2 z-10">
        {icon && (
          <span className="transition-all duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
            {icon}
          </span>
        )}
        <span className="transition-all duration-300 ease-out group-hover:translate-x-1">
          {children}
        </span>
      </span>
      
      {/* Border highlight */}
      <span className="absolute inset-0 rounded-lg border border-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
    </button>
  );
}