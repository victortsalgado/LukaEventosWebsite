import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  folder: string;
  serviceName: string;
  autoPlay?: boolean;
}

export function ImageCarousel({ images, folder, serviceName, autoPlay = true }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Auto-rotação
  useEffect(() => {
    if (isPlaying && !isFullscreen && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isFullscreen, images.length]);

  // Pausar quando abrir tela cheia
  useEffect(() => {
    if (isFullscreen) {
      setIsPlaying(false);
    } else if (autoPlay) {
      setIsPlaying(true);
    }
  }, [isFullscreen, autoPlay]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeFullscreen();
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [isFullscreen, isPlaying]);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];
  const hasError = imageErrors[currentIndex];

  return (
    <>
      {/* Carrossel normal */}
      <div className="relative h-48 overflow-hidden group">
        {!hasError ? (
          <img
            src={`/api/images/${folder}/${currentImage}`}
            alt={`${serviceName} - Imagem ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 cursor-pointer hover:scale-105"
            onError={() => handleImageError(currentIndex)}
            onClick={openFullscreen}
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

        {/* Controles do carrossel */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={16} />
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Ir para imagem ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de tela cheia */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Botão fechar */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Fechar tela cheia"
            >
              <X size={24} />
            </button>

            {/* Imagem em tela cheia */}
            <img
              src={`/api/images/${folder}/${currentImage}`}
              alt={`${serviceName} - Imagem ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={() => handleImageError(currentIndex)}
            />

            {/* Controles em tela cheia */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Contador */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                  {currentIndex + 1} / {images.length}
                </div>

                {/* Indicadores em tela cheia */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        idx === currentIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Ir para imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Instruções */}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            <p>Use as setas ← → para navegar</p>
            <p>Pressione ESC para sair</p>
            <p>Barra de espaço para pausar/reproduzir</p>
          </div>
        </div>
      )}
    </>
  );
}