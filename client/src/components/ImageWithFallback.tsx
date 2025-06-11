import { useState, useEffect } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackType: 'team' | 'portfolio' | 'service' | 'gallery';
  fallbackData?: {
    name?: string;
    title?: string;
    index?: number;
  };
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = "", 
  fallbackType, 
  fallbackData = {} 
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const generateTeamFallback = () => {
    const { name = "Membro", index = 0 } = fallbackData;
    const colors = ['#FF6600', '#FF8833', '#FF4400', '#FF7700'];
    const color = colors[index % colors.length];
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    return (
      <div 
        className={`${className} bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl`}
        style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
      >
        {initials}
      </div>
    );
  };

  const generatePortfolioFallback = () => {
    const { title = "Projeto", index = 0 } = fallbackData;
    const gradients = [
      'from-orange-400 to-orange-600',
      'from-orange-500 to-red-500', 
      'from-yellow-400 to-orange-500',
      'from-orange-300 to-orange-700'
    ];
    
    return (
      <div className={`${className} bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center text-white p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold">{title.charAt(0)}</span>
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded"></div>
        <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-2 bg-white/20 rounded"></div>
      </div>
    );
  };

  const generateServiceFallback = () => {
    const { title = "Serviço", index = 0 } = fallbackData;
    return (
      <div className={`${className} bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden`}>
        <div className="text-center text-orange-800 p-6">
          <div className="w-12 h-12 mx-auto mb-3 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{title.charAt(0)}</span>
          </div>
          <p className="font-semibold">{title}</p>
        </div>
      </div>
    );
  };

  const generateGalleryFallback = () => {
    const { index = 0 } = fallbackData;
    return (
      <div className={`${className} bg-gradient-to-br from-gray-100 to-orange-100 flex items-center justify-center relative overflow-hidden`}>
        <div className="text-center text-gray-700 p-4">
          <div className="w-16 h-16 mx-auto mb-3 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
              <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <p className="text-sm font-medium">Galeria de Eventos</p>
        </div>
      </div>
    );
  };

  const renderFallback = () => {
    switch (fallbackType) {
      case 'team': return generateTeamFallback();
      case 'portfolio': return generatePortfolioFallback();
      case 'service': return generateServiceFallback();
      case 'gallery': return generateGalleryFallback();
      default: return generatePortfolioFallback();
    }
  };

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [src]);

  if (imageError) {
    return renderFallback();
  }

  return (
    <>
      {!imageLoaded && renderFallback()}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        onLoad={() => {
          setImageLoaded(true);
          setImageError(false);
        }}
        onError={() => {
          setImageError(true);
          setImageLoaded(false);
        }}
      />
    </>
  );
}