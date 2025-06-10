import { ClipboardCheck, Hammer, Utensils, Users, Settings, Coffee, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: Users,
    title: "Organização e Consultoria",
    description: "Planejamento estratégico completo para seu evento, desde a concepção até a execução.",
    image: "https://storage.replit.com/luka-eventos-assets/Congressos/congresso_abrh.png",
    alt: "Palestra em congresso organizado pela Luka Eventos"
  },
  {
    icon: Settings,
    title: "Produção e Montagem",
    description: "Montagem de stands, cenários e toda infraestrutura necessária para seu evento.",
    image: "https://storage.replit.com/luka-eventos-assets/Projeto3D/projeto3d_tramontina.png",
    alt: "Render 3D de stand da Tramontina"
  },
  {
    icon: Coffee,
    title: "Buffet e Locação",
    description: "Serviços de catering e locação de equipamentos e mobiliário para eventos.",
    image: "https://storage.replit.com/luka-eventos-assets/Buffet/buffet_tabuadefrios.png",
    alt: "Mesa de buffet com tábua de frios"
  },
  {
    icon: Award,
    title: "Equipes Especializadas",
    description: "Profissionais qualificados para recepção, hostess e apoio durante o evento.",
    image: "https://storage.replit.com/luka-eventos-assets/Equipes/promotoras_1.png",
    alt: "Promotoras em evento corporativo"
  },
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
            Soluções Completas para o Seu Evento
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
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-8">
        <div className="w-16 h-16 bg-primary-orange text-white rounded-full flex items-center justify-center mb-6">
          <Icon size={32} />
        </div>
        <h3 className="text-2xl font-bold text-dark-gray mb-4">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    </div>
  );
}