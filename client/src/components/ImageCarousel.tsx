import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  folder: string;
  serviceName: string;
  startDelay?: number;
}

export function ImageCarousel({ images, folder, serviceName, startDelay = 0 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Auto-rotação sincronizada
  useEffect(() => {
    if (images.length > 1) {
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // 5 segundos para transição mais suave
        
        // Cleanup no useEffect
        return () => clearInterval(interval);
      }, startDelay);

      return () => clearTimeout(timeout);
    }
  }, [images.length, startDelay]);

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative h-48 overflow-hidden">
      {/* Container das imagens com transição suave */}
      <div className="relative w-full h-full">
        {images.map((image, idx) => {
          const isActive = idx === currentIndex;
          const hasCurrentError = imageErrors[idx];
          
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {!hasCurrentError ? (
                <img
                  src={`/api/images/${folder}/${image}`}
                  alt={`${serviceName} - Imagem ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(idx)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📸</div>
                    <p className="text-sm">Imagem não disponível</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Indicadores discretos */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'bg-white scale-125' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}