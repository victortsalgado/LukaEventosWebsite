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
    <section className="w-full bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-white mb-2">Parceiros de Sucesso</h3>
        </div>
      </div>
    </section>
  );
}