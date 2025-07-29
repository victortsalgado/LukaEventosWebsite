import { ClipboardCheck, Hammer, Utensils, Users, Settings, Coffee, Award, Palette, Target, MapPin, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import { ImageCarousel } from "./ImageCarousel";

interface ServiceImage {
  name: string;
  url: string;
}

interface ServiceData {
  icon: any;
  title: string;
  description: string;
  folder: string;
  videoFile?: string;
  features: string[];
}

const servicesConfig: ServiceData[] = [
  {
    icon: MapPin,
    title: "Feiras e Eventos",
    description: "Participação em feiras e eventos com stands personalizados e atendimento especializado.",
    folder: "Feiras",
    features: ["Stands personalizados", "Atendimento qualificado", "Material promocional", "Networking estratégico"]
  },
  {
    icon: Target,
    title: "Projetos 3D",
    description: "Visualização completa do seu evento antes mesmo da montagem, garantindo que tudo saia perfeito.",
    folder: "Projeto 3D",
    features: ["Renderização realista", "Plantas baixas", "Mockups 3D", "Aprovação prévia"]
  },
  {
    icon: Coffee,
    title: "Locação",
    description: "Locação de equipamentos e mobiliário para eventos completos e bem estruturados.",
    folder: "Locacao",
    features: ["Equipamentos profissionais", "Mobiliário variado", "Tecnologia moderna", "Logística completa"]
  },
  {
    icon: Palette,
    title: "Decoração",
    description: "Criação de ambientes únicos e personalizados que refletem a identidade do seu evento.",
    folder: "Decoracao",
    features: ["Design personalizado", "Iluminação especial", "Paisagismo", "Ambientação temática"]
  },
  {
    icon: Utensils,
    title: "Buffet",
    description: "Serviços de catering com cardápio personalizado e apresentação impecável.",
    folder: "Buffet",
    features: ["Cardápio personalizado", "Apresentação gourmet", "Serviço completo", "Opções especiais"]
  },
  {
    icon: Award,
    title: "Equipes Especializadas",
    description: "Profissionais qualificados para recepção, hostess e apoio durante o evento.",
    folder: "Equipes",
    features: ["Recepcionistas", "Hostess", "Coordenadores", "Equipe técnica"]
  },
  {
    icon: Hammer,
    title: "Ações Promocionais",
    description: "Criação e execução de ações promocionais impactantes para sua marca.",
    folder: "Acoes Promocionais",
    features: ["Ativações de marca", "Experiências interativas", "Materiais promocionais", "Engajamento do público"]
  }
];

// Hook para buscar imagens de uma pasta específica
function useServiceImages(folder: string) {
  return useQuery({
    queryKey: [`/api/storage/images/${folder}`],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/storage/images/${folder}`);
        if (!response.ok) {
          if (response.status === 404) {
            return { images: [] };
          }
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.warn(`No images found for ${folder}:`, error);
        return { images: [] };
      }
    },
    enabled: !!folder, // Só executar se folder estiver definido
  });
}

export default function Services() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="py-20 bg-light-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Schema.org for Services */}
        {servicesConfig.map((service, index) => (
          <script key={index} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `https://lukaeventos.com.br/#service-${service.title.toLowerCase().replace(/\s+/g, '-')}`,
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "Organization",
              "@id": "https://lukaeventos.com.br/#organization"
            },
            "serviceType": service.title,
            "areaServed": {
              "@type": "Place",
              "name": "Região Norte do Brasil",
              "containedInPlace": {
                "@type": "State",
                "name": "Pará",
                "containedInPlace": {
                  "@type": "Country",
                  "name": "Brasil"
                }
              }
            },
            "url": "https://lukaeventos.com.br/#services",
            "category": "Event Planning Services",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${service.title} - Catálogo de Serviços`,
              "itemListElement": service.features.map((feature, idx) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": feature,
                  "description": `${feature} como parte dos serviços de ${service.title}`
                }
              }))
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "BRL",
                "price": "Sob consulta"
              }
            }
          })}
          </script>
        ))}

        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-gold mb-6">
            Soluções Completas para o Seu Evento
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-secondary-text max-w-3xl mx-auto px-4">
            Oferecemos soluções completas para todos os tipos de eventos, desde a
            concepção até a execução final.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {servicesConfig.map((service, index) => (
            <ErrorBoundary key={index}>
              <ServiceCard service={service} index={index} />
            </ErrorBoundary>
          ))}
        </div>

        <div
          ref={ctaRef}
          className={`text-center mt-12 transition-all duration-1000 ${
            ctaVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <button
            onClick={scrollToContact}
            className="inline-block bg-primary-gold text-light-background px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Solicitar Orçamento Personalizado
          </button>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = service.icon;

  // Buscar imagens da pasta específica do serviço
  const { data: imagesData, isLoading } = useServiceImages(service.folder);
  const images = Array.isArray(imagesData?.images) ? imagesData.images : [];

  const renderMedia = () => {
    // Para todos os serviços, primeiro verificar se há imagens
    if (isLoading) {
      return (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <Icon size={48} className="text-gray-400" />
        </div>
      );
    }

    // Se há imagens, usar o carrossel com delay baseado no índice para sincronização
    if (images.length > 0) {
      const carousel = <ImageCarousel 
        images={images} 
        folder={service.folder} 
        serviceName={service.title}
        startDelay={index * 500} // Atraso escalonado para sincronização
      />;
      
      // Se o carrossel retornar null (todas as imagens falharam), mostra fallback
      return (
        <ErrorBoundary fallback={
          <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
            <div className="text-center">
              <service.icon className="mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm opacity-90">Conteúdo em breve</p>
            </div>
          </div>
        }>
          {carousel}
        </ErrorBoundary>
      );
    }

    // Se é "Produção e Montagem" e não há imagens, verificar se há vídeo disponível
    if (service.videoFile && service.title === "Produção e Montagem") {
      // Primeiro verificar se o vídeo existe nos arquivos retornados pela API
      const hasVideo = images.some((file: string) => file.toLowerCase().includes('.mp4') || file.toLowerCase().includes('.webm'));
      
      if (hasVideo) {
        const videoFile = images.find((file: string) => file.toLowerCase().includes('.mp4') || file.toLowerCase().includes('.webm'));
        return (
          <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                if (target && target.nextElementSibling) {
                  target.style.display = 'none';
                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            >
              <source src={`/api/images/${service.folder}/${videoFile}`} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white" style={{ display: 'none' }}>
              <div className="text-center p-4">
                <Icon size={48} className="mx-auto mb-2" />
                <p className="text-sm font-semibold">Produção e Montagem</p>
                <p className="text-xs opacity-80 mt-1">Stands e Cenários</p>
              </div>
            </div>
          </div>
        );
      }
    }

    // Fallback para serviços sem imagens
    const gradients = {
      "Organização e Consultoria": "from-amber-400 to-orange-500",
      "Projetos 3D": "from-cyan-400 to-blue-500", 
      "Decoração": "from-pink-400 to-rose-500",
      "Produção e Montagem": "from-blue-500 to-purple-600",
      "Buffet": "from-green-400 to-emerald-500",
      "Locação": "from-indigo-400 to-purple-500",
      "Equipes Especializadas": "from-red-400 to-pink-500",
      "Ações Promocionais": "from-yellow-400 to-orange-500"
    };
    
    const gradient = gradients[service.title as keyof typeof gradients] || "from-orange-400 to-orange-600";
    
    return (
      <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center text-white p-4">
          <Icon size={48} className="mx-auto mb-2 drop-shadow-lg" />
          <p className="text-sm font-semibold drop-shadow">{service.title}</p>
        </div>
        <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-lg"></div>
        <div className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/10 rounded"></div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      data-service={service.title}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {renderMedia()}
      <div className="p-6">
        <div className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center mb-4">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-dark-gray mb-3">{service.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        <div className="space-y-1">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-xs text-gray-500">
              <div className="w-1 h-1 bg-primary-orange rounded-full mr-2"></div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}