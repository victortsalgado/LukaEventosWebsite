import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  {
    name: "Maria Costa",
    company: "Diretora de Marketing - TechCorp",
    initials: "MC",
    text: "A Luka Eventos superou todas nossas expectativas. O lançamento do nosso produto foi um sucesso absoluto!"
  },
  {
    name: "Ana Silva",
    company: "Noiva",
    initials: "AS",
    text: "Profissionalismo excepcional! Nosso casamento foi exatamente como sonhamos. Muito obrigada por tudo!"
  },
  {
    name: "Roberto Santos",
    company: "CEO - InnovaCorp",
    initials: "RS",
    text: "Organização impecável e atenção aos detalhes. Nossa conferência anual foi um grande sucesso!"
  }
];

const companyLogos = [
  "EMPRESA A",
  "EMPRESA B", 
  "EMPRESA C",
  "EMPRESA D",
  "EMPRESA E",
  "EMPRESA F"
];

export default function Clients() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation();

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Nossos Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A confiança de grandes empresas e pessoas especiais é nossa maior
            conquista. Veja o que nossos clientes dizem sobre nosso trabalho.
          </p>
        </div>

        {/* Client Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Client Logos */}
        <div
          ref={logosRef}
          className={`transition-all duration-1000 ${
            logosVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h3 className="text-2xl font-bold text-dark-gray text-center mb-8">
            Empresas que Confiam em Nosso Trabalho
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {companyLogos.map((logo, index) => (
              <div
                key={index}
                className="bg-gray-200 h-16 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-500 font-semibold">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-light-gray p-8 rounded-2xl shadow-lg transition-all duration-1000 ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="flex text-primary-orange">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-primary-orange rounded-full flex items-center justify-center text-white font-bold mr-4">
          {testimonial.initials}
        </div>
        <div>
          <div className="font-semibold text-dark-gray">{testimonial.name}</div>
          <div className="text-sm text-gray-500">{testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}
