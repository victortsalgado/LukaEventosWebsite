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
    console.log(`Erro ao carregar imagem ${index} da pasta ${folder}:`, images[index]);
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
                  onLoad={() => console.log(`Imagem carregada com sucesso: ${folder}/${image}`)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <div className="text-center">
                    <svg
                      className="w-8 h-8 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
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