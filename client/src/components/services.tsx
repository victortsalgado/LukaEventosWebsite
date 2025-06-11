import { ClipboardCheck, Hammer, Utensils, Users, Settings, Coffee, Award, Palette, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

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
    icon: Users,
    title: "Organização e Consultoria",
    description: "Planejamento estratégico completo para seu evento, desde a concepção até a execução final.",
    folder: "Organizacao e Consultoria",
    features: ["Briefing detalhado", "Cronograma personalizado", "Gestão de fornecedores", "Coordenação geral"]
  },
  {
    icon: Target,
    title: "Projetos 3D",
    description: "Visualização completa do seu evento antes mesmo da montagem, garantindo que tudo saia perfeito.",
    folder: "Projeto 3D",
    features: ["Renderização realista", "Plantas baixas", "Mockups 3D", "Aprovação prévia"]
  },
  {
    icon: Palette,
    title: "Decoração",
    description: "Criação de ambientes únicos e personalizados que refletem a identidade do seu evento.",
    folder: "Decoracao",
    features: ["Design personalizado", "Iluminação especial", "Paisagismo", "Ambientação temática"]
  },
  {
    icon: Settings,
    title: "Produção e Montagem",
    description: "Montagem de stands, cenários e toda infraestrutura necessária para seu evento.",
    folder: "Producao e Montagem",
    videoFile: "insta_media.mp4",
    features: ["Montagem de stands", "Cenários customizados", "Infraestrutura técnica", "Coordenação de montagem"]
  },
  {
    icon: Utensils,
    title: "Buffet",
    description: "Serviços de catering com cardápio personalizado e apresentação impecável.",
    folder: "Buffet",
    features: ["Cardápio personalizado", "Apresentação gourmet", "Serviço completo", "Opções especiais"]
  },
  {
    icon: Coffee,
    title: "Locação",
    description: "Locação de equipamentos e mobiliário para eventos completos e bem estruturados.",
    folder: "Locacao",
    features: ["Equipamentos profissionais", "Mobiliário variado", "Tecnologia moderna", "Logística completa"]
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
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching images for ${folder}:`, error);
        return { images: [] };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
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
    <section id="services" className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Soluções Completas para o Seu Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para todos os tipos de eventos, desde a
            concepção até a execução final.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {servicesConfig.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
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
            className="inline-block bg-primary-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Icon = service.icon;

  // Buscar imagens da pasta específica do serviço
  const { data: imagesData, isLoading } = useServiceImages(service.folder);
  const images = Array.isArray(imagesData?.images) ? imagesData.images : [];

  // Auto-rotação do carrossel
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const renderMedia = () => {
    // Se é o serviço de "Produção e Montagem", mostrar vídeo
    if (service.videoFile) {
      return (
        <div className="h-48 overflow-hidden bg-black flex items-center justify-center">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={`/api/images/${service.folder}/${service.videoFile}`} type="video/mp4" />
            <div className="text-white text-center p-4">
              <Icon size={48} className="mx-auto mb-2" />
              <p>Vídeo de Produção e Montagem</p>
            </div>
          </video>
        </div>
      );
    }

    // Para outros serviços, mostrar carrossel de imagens
    if (isLoading) {
      return (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <Icon size={48} className="text-gray-400" />
        </div>
      );
    }

    if (images.length === 0) {
      return (
        <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
          <div className="text-center text-orange-800">
            <Icon size={48} className="mx-auto mb-2" />
            <p className="text-sm font-semibold">{service.title}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-48 overflow-hidden">
        <img
          src={`/api/images/${service.folder}/${images[currentImageIndex]}`}
          alt={`${service.title} - Imagem ${currentImageIndex + 1}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_: string, idx: number) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
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