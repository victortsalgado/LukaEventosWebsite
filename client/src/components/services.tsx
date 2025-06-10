import { ClipboardCheck, Hammer, Utensils, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: ClipboardCheck,
    title: "Organização e Consultoria",
    description: "Planejamento estratégico completo do seu evento, desde a concepção até os detalhes finais.",
    features: ["Consultoria especializada", "Cronograma detalhado", "Coordenação geral"]
  },
  {
    icon: Hammer,
    title: "Produção e Montagem de Stands",
    description: "Criação e montagem de stands personalizados que impressionam e atraem seu público.",
    features: ["Design personalizado", "Montagem profissional", "Materiais de qualidade"]
  },
  {
    icon: Utensils,
    title: "Buffet Completo e Locação",
    description: "Serviços gastronômicos excepcionais e locação de equipamentos para seu evento.",
    features: ["Cardápio personalizado", "Equipamentos completos", "Serviço impecável"]
  },
  {
    icon: Users,
    title: "Equipes Especializadas",
    description: "Profissionais altamente qualificados para garantir o sucesso do seu evento.",
    features: ["Coordenadores experientes", "Equipe de apoio", "Atendimento dedicado"]
  }
];

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
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para todos os tipos de eventos, desde a
            concepção até a execução final.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
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

function ServiceCard({ service, index }: { service: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl text-primary-orange mb-6 text-center">
        <service.icon size={48} className="mx-auto" />
      </div>
      <h3 className="text-xl font-bold text-dark-gray mb-4 text-center">
        {service.title}
      </h3>
      <p className="text-gray-600 text-center mb-6">{service.description}</p>
      <ul className="text-sm text-gray-600 space-y-2">
        {service.features.map((feature: string, featureIndex: number) => (
          <li key={featureIndex} className="flex items-center">
            <div className="w-2 h-2 bg-primary-orange rounded-full mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
