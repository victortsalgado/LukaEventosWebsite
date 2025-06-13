import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const journeySteps = [
  {
    number: 1,
    title: "Briefing",
    description: "Reunião detalhada para entender suas necessidades, objetivos, orçamento e visão para o evento perfeito.",
    image: "/api/images/briefing.avif",
    alt: "Reunião de briefing inicial com cliente"
  },
  {
    number: 2,
    title: "Consultoria+",
    description: "Desenvolvimento de estratégia personalizada, seleção de fornecedores e criação do conceito visual único.",
    image: "/api/images/consultoria.jpg",
    alt: "Processo de consultoria especializada"
  },
  {
    number: 3,
    title: "Proposta",
    description: "Apresentação da proposta completa com cronograma detalhado, orçamento e todos os detalhes do projeto.",
    image: "/api/images/proposta.jpg",
    alt: "Apresentação de proposta detalhada"
  },
  {
    number: 4,
    title: "Evento",
    description: "Execução impecável com coordenação em tempo real, garantindo que cada detalhe saia conforme planejado.",
    image: "/api/images/evento.jpeg",
    alt: "Evento sendo executado com sucesso"
  },
  {
    number: 5,
    title: "Pós Evento",
    description: "Acompanhamento pós-evento, análise de resultados e feedback para garantir total satisfação do cliente.",
    image: "/api/images/pos_evento.avif",
    alt: "Análise pós-evento e feedback"
  }
];

export default function Journey() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section id="journey" className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Nossa Metodologia de Sucesso
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça o processo que utilizamos para transformar sua visão em realidade,
            passo a passo até o evento perfeito.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-orange opacity-30 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {journeySteps.map((step, index) => (
              <JourneyStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyStep({ step, index }: { step: any; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center transition-all duration-1000 ${
        isVisible ? "animate-on-scroll visible" : "animate-on-scroll"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className={`md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'} mb-6 md:mb-0`}>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
              {step.number}
            </div>
            <h3 className="text-2xl font-bold text-dark-gray">{step.title}</h3>
          </div>
          <p className="text-gray-600">{step.description}</p>
        </div>
      </div>
      <div className={`md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
        <img
          src={step.image}
          alt={step.alt}
          className="rounded-2xl shadow-lg w-full h-auto"
          onError={(e) => {
            console.error(`Erro ao carregar imagem da metodologia: ${step.image}`);
            (e.target as HTMLImageElement).style.display = 'none';
          }}
          onLoad={() => {
            console.log(`Imagem da metodologia carregada: ${step.image}`);
          }}
        />
      </div>
    </div>
  );
}
