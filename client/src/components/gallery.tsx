
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const galleryItems = [
  {
    image: "https://storage.replit.com/luka-eventos-assets/AcoesPraia/acao_praia_ipanema.png",
    alt: "Ação promocional da Ipanema na praia",
    title: "Ação Promocional"
  },
  {
    image: "https://storage.replit.com/luka-eventos-assets/Mascotes/mascotes.png",
    alt: "Mascotes animados em evento",
    title: "Animação e Mascotes"
  },
  {
    image: "https://storage.replit.com/luka-eventos-assets/Decoracao/paisagismo.jpg",
    alt: "Projeto de paisagismo e decoração",
    title: "Paisagismo e Decoração"
  },
  {
    image: "https://storage.replit.com/luka-eventos-assets/Locacao/locacao_mesa_cadeira.png",
    alt: "Mobiliário para locação em eventos",
    title: "Locação de Mobiliário"
  },
];

export default function Gallery() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Nossos Detalhes em Ação
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja de perto a qualidade e atenção aos detalhes que aplicamos em cada projeto,
            desde ações promocionais até decoração e locação completa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {galleryItems.map((item, index) => (
            <GalleryCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }: { item: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-dark-gray text-center">{item.title}</h3>
      </div>
    </div>
  );
}
