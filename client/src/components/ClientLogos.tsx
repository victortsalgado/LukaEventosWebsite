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

  const clientImages: ClientImage[] = clientData?.images?.map((filename: string) => ({
    name: filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, ''),
    url: `/api/images/Empresas Clientes/${filename}`
  })) || [];

  if (isLoading || clientImages.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gray-50 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-gray-600 font-medium">Empresas que confiam em nossos serviços</p>
        </div>
        
        {/* Continuous scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {clientImages.map((client, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center mx-8 min-w-[150px]"
              >
                <img
                  src={client.url}
                  alt={`Logo ${client.name}`}
                  className="max-h-12 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  onError={(e) => {
                    console.log(`Erro ao carregar logo do cliente: ${client.name}`);
                    // Show placeholder if image fails
                    const placeholder = document.createElement('div');
                    placeholder.className = 'bg-gray-200 h-12 w-32 rounded flex items-center justify-center text-xs text-gray-500';
                    placeholder.textContent = client.name;
                    (e.target as HTMLElement).parentNode?.replaceChild(placeholder, e.target as HTMLElement);
                  }}
                  onLoad={() => {
                    console.log(`Logo carregada com sucesso: ${client.name}`);
                  }}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clientImages.map((client, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center mx-8 min-w-[150px]"
              >
                <img
                  src={client.url}
                  alt={`Logo ${client.name}`}
                  className="max-h-12 max-w-32 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  onError={(e) => {
                    console.log(`Erro ao carregar logo do cliente: ${client.name}`);
                    // Show placeholder if image fails
                    const placeholder = document.createElement('div');
                    placeholder.className = 'bg-gray-200 h-12 w-32 rounded flex items-center justify-center text-xs text-gray-500';
                    placeholder.textContent = client.name;
                    (e.target as HTMLElement).parentNode?.replaceChild(placeholder, e.target as HTMLElement);
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