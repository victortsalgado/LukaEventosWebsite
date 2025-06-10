import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const journeySteps = [
  {
    number: 1,
    title: "Briefing",
    description: "Reunião detalhada para entender suas necessidades, objetivos, orçamento e visão para o evento perfeito.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    alt: "Reunião de briefing inicial com cliente"
  },
  {
    number: 2,
    title: "Consultoria+",
    description: "Desenvolvimento de estratégia personalizada, seleção de fornecedores e criação do conceito visual único.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    alt: "Processo de consultoria especializada"
  },
  {
    number: 3,
    title: "Proposta",
    description: "Apresentação da proposta completa com cronograma detalhado, orçamento e todos os detalhes do projeto.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    alt: "Apresentação de proposta detalhada"
  },
  {
    number: 4,
    title: "Evento",
    description: "Execução impecável com coordenação em tempo real, garantindo que cada detalhe saia conforme planejado.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    alt: "Evento sendo executado com sucesso"
  },
  {
    number: 5,
    title: "Pós Evento",
    description: "Acompanhamento pós-evento, análise de resultados e feedback para garantir total satisfação do cliente.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
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
        />
      </div>
    </div>
  );
}
