import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const portfolioItems = [
  {
    image: "https://storage.replit.com/luka-eventos-assets/Feiras/supernorte_marata_1.png",
    title: "Projeto Maratá",
    description: "Stand da Maratá na feira Supernorte",
    alt: "Stand da Maratá na feira Supernorte"
  },
  {
    image: "https://storage.replit.com/luka-eventos-assets/Feiras/supernorte_okajima_1.png",
    title: "Projeto Okajima Distribuidora",
    description: "Stand personalizado para feira comercial",
    alt: "Stand da Okajima na feira Supernorte"
  },
  {
    image: "https://storage.replit.com/luka-eventos-assets/Feiras/exposibram_dinamica.png",
    title: "Projeto Dinamica",
    description: "Stand da Dinamica na feira Exposibram",
    alt: "Stand da Dinamica na feira Exposibram"
  },
  {
    image: "https://storage.replit.com/luka-eventos-assets/Feiras/supernorte_bendo_alimentos_1.png",
    title: "Projeto Bendo Alimentos",
    description: "Stand da Bendo Alimentos na feira Supernorte",
    alt: "Stand da Bendo Alimentos na feira Supernorte"
  },
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
            Eventos que Inspiram Confiança
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos eventos únicos que criamos para nossos clientes. Cada
            projeto é uma história de sucesso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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