import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const portfolioItems = [
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    title: "Evento Corporativo",
    description: "Lançamento de produto para empresa multinacional",
    alt: "Evento corporativo elegante com palco moderno e iluminação profissional"
  },
  {
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    title: "Casamento de Luxo",
    description: "Cerimônia dos sonhos em venue exclusivo",
    alt: "Cerimônia de casamento luxuosa com decorações florais elegantes"
  },
  {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    title: "Feira Comercial",
    description: "Stand inovador para empresa de tecnologia",
    alt: "Stand profissional em feira comercial com design moderno e branding"
  },
  {
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    title: "Festa Privada",
    description: "Celebração exclusiva de aniversário",
    alt: "Festa de aniversário elegante com mesas sofisticadas e decoração refinada"
  },
  {
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    title: "Conferência",
    description: "Evento educacional para 500+ participantes",
    alt: "Conferência corporativa com palco profissional e audiência"
  },
  {
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    title: "Gala Beneficente",
    description: "Jantar de arrecadação de fundos",
    alt: "Jantar de gala festivo com mesas elegantes e iluminação ambiente"
  }
];

export default function Portfolio() {
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
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos eventos únicos que criamos para nossos clientes. Cada
            projeto é uma história de sucesso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={index} item={item} index={index} />
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
            Vamos Criar Algo Incrível Juntos
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioItem({ item, index }: { item: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group transition-all duration-1000 ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <img
          src={item.image}
          alt={item.alt}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-sm">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
