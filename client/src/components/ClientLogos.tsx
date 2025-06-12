import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ClientImage {
  name: string;
  url: string;
}

function useClientImages() {
  return useQuery({
    queryKey: ['/api/storage/images', 'Empresas Clientes'],
    queryFn: () => fetch('/api/storage/images/Empresas Clientes').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default function ClientLogos() {
  const { data: clientData, isLoading } = useClientImages();
  const [currentIndex, setCurrentIndex] = useState(0);

  const clientImages: ClientImage[] = clientData?.images?.map((filename: string) => ({
    name: filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, ''),
    url: `/api/images/Empresas Clientes/${filename}`
  })) || [];

  // Auto-scroll carousel
  useEffect(() => {
    if (clientImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clientImages.length);
    }, 3000); // 3 segundos por logo

    return () => clearInterval(interval);
  }, [clientImages.length]);

  if (isLoading) {
    return (
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Nossos Clientes</h3>
            <p className="text-gray-600">Empresas que confiam em nossos serviços</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse bg-gray-200 h-20 w-40 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!clientImages.length) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Nossos Clientes</h3>
          <p className="text-gray-600">Empresas que confiam em nossos serviços</p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center min-h-[120px]">
            {clientImages.length > 0 && (
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${clientImages.length * 100}%`
                }}
              >
                {clientImages.map((client, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center px-8"
                    style={{ width: `${100 / clientImages.length}%` }}
                  >
                    <img
                      src={client.url}
                      alt={`Logo ${client.name}`}
                      className="max-h-20 max-w-40 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                      onError={(e) => {
                        console.log(`Erro ao carregar logo do cliente: ${client.name}`);
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log(`Logo carregada com sucesso: ${client.name}`);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Indicadores */}
          {clientImages.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {clientImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}