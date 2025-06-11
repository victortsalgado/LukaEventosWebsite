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

  // Controles de teclado para modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        case 'Escape':
          e.preventDefault();
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

      {/* Modal expandido */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeFullscreen}>
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors z-10"
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>

            {/* Área da imagem */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              {!hasError ? (
                <img
                  src={`/api/images/${folder}/${currentImage}`}
                  alt={`${serviceName} - Imagem ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(currentIndex)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📸</div>
                    <p>Imagem não disponível</p>
                  </div>
                </div>
              )}

              {/* Controles de navegação */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Contador */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Informações do serviço */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{serviceName}</h3>
              <p className="text-gray-600 mb-4">Imagem {currentIndex + 1} de {images.length}</p>
              
              {/* Indicadores de navegação */}
              {images.length > 1 && (
                <div className="flex justify-center space-x-2 mb-4">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        idx === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                      aria-label={`Ir para imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Controles de reprodução */}
              {images.length > 1 && (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isPlaying ? 'Pausar' : 'Reproduzir'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}