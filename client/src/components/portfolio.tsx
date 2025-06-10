import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const portfolioItems = [
  {
    image: "https://storage.replit.com/v1/objects/projeto-marata-evento-corporativo.jpg",
    title: "Projeto Maratá",
    description: "Evento corporativo com soluções completas",
    alt: "Projeto Maratá - evento corporativo realizado pela Luka Eventos"
  },
  {
    image: "https://storage.replit.com/v1/objects/projeto-bendo-alimentos-lancamento.jpg",
    title: "Projeto Bendo Alimentos",
    description: "Lançamento de produto com produção completa",
    alt: "Projeto Bendo Alimentos - evento de lançamento pela Luka Eventos"
  },
  {
    image: "https://storage.replit.com/v1/objects/projeto-okajima-stand-feira.jpg",
    title: "Projeto Okajima Distribuidora",
    description: "Stand personalizado para feira comercial",
    alt: "Projeto Okajima Distribuidora - stand em feira pela Luka Eventos"
  },
  {
    image: "https://storage.replit.com/v1/objects/projeto-tramontina-evento-institucional.jpg",
    title: "Projeto Tramontina",
    description: "Evento institucional de grande porte",
    alt: "Projeto Tramontina - evento institucional pela Luka Eventos"
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
