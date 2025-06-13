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
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-orange-400"></div>
            <span className="text-sm font-semibold text-orange-500 tracking-wider uppercase">Parceiros de Sucesso</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-orange-400"></div>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Marcas que Confiam na Nossa Excelência</h3>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Grandes empresas escolhem a Luka Eventos para criar experiências memoráveis e impactantes
          </p>
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