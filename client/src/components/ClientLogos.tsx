import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface ClientImage {
  name: string;
  url: string;
}

function useClientImages() {
  return useQuery({
    queryKey: ['/api/storage/images', 'Logo Clientes'],
    queryFn: () => fetch('/api/storage/images/Logo Clientes').then(res => res.json()),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default function ClientLogos() {
  const { data: clientData, isLoading } = useClientImages();

  const clientImages: ClientImage[] = clientData?.images?.map((filename: string) => ({
    name: filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, ''),
    url: `/api/images/Logo Clientes/${filename}`
  })) || [];

  if (isLoading || clientImages.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gradient-to-r from-gray-50 via-white to-gray-50 py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
              Parceiros de Sucesso
            </h2>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-gray-300 via-gray-600 to-gray-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Continuous scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="animate-scroll" style={{ width: 'calc(300%)' }}>
            {/* First set of logos */}
            {clientImages.map((client, index) => (
              <div 
                key={`first-${index}`}
                className="inline-flex items-center justify-center mx-6 w-[160px] h-[80px]"
              >
                <img
                  src={client.url}
                  alt={`Logo ${client.name}`}
                  className="max-h-12 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  onError={(e) => {
                    console.log(`Erro ao carregar logo do cliente: ${client.name}`);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log(`Logo carregada com sucesso: ${client.name}`);
                  }}
                />
              </div>
            ))}
            {/* Second set for seamless loop */}
            {clientImages.map((client, index) => (
              <div 
                key={`second-${index}`}
                className="inline-flex items-center justify-center mx-6 w-[160px] h-[80px]"
              >
                <img
                  src={client.url}
                  alt={`Logo ${client.name}`}
                  className="max-h-12 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  onError={(e) => {
                    console.log(`Erro ao carregar logo do cliente: ${client.name}`);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
            {/* Third set for seamless infinite flow */}
            {clientImages.map((client, index) => (
              <div 
                key={`third-${index}`}
                className="inline-flex items-center justify-center mx-6 w-[160px] h-[80px]"
              >
                <img
                  src={client.url}
                  alt={`Logo ${client.name}`}
                  className="max-h-12 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  onError={(e) => {
                    console.log(`Erro ao carregar logo do cliente: ${client.name}`);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}