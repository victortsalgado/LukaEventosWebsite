import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";

interface TeamCardProps {
  imageSrc: string;
  name: string;
  title: string;
  location: string;
  index?: number;
}

export default function TeamCard({ imageSrc, name, title, location, index = 0 }: TeamCardProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [imageError, setImageError] = useState(false);

  const generateInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getBackgroundColor = (index: number) => {
    const colors = ['bg-orange-500', 'bg-orange-600', 'bg-orange-400', 'bg-orange-700'];
    return colors[index % colors.length];
  };

  return (
    <div
      ref={ref}
      className={`team-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {!imageError ? (
        <img
          src={imageSrc}
          alt={`Foto de ${name}`}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary-orange"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-orange ${getBackgroundColor(index)} flex items-center justify-center`}>
          <span className="text-white font-bold text-lg">{generateInitials(name)}</span>
        </div>
      )}
      <h3 className="text-xl font-bold text-dark-gray mb-2">{name}</h3>
      <p className="text-primary-orange font-semibold mb-1">{title}</p>
      <p className="text-gray-600 text-sm">{location}</p>
    </div>
  );
}