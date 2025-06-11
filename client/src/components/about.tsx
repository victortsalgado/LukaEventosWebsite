import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import TeamCard from "@/components/TeamCard";

export default function About() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();

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
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
            Experiência que Gera Resultados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos um time experiente, coordenando várias equipes capacitadas e prontas para acertar cada detalhe. A diretora Lúcia Salgado é acessível e fará com que tudo saia como o esperado, além de preparar o time para qualquer situação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            ref={imageRef}
            className={`transition-all duration-1000 ${
              imageVisible ? "animate-on-scroll visible" : "animate-on-scroll"
            }`}
          >
            <img
              src="/api/images/Equipe/equipe_profissional_luka_eventos.jpg"
              alt="Equipe profissional da Luka Eventos planejando eventos"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
          
          <div
            ref={contentRef}
            className={`transition-all duration-1000 ${
              contentVisible ? "animate-on-scroll visible" : "animate-on-scroll"
            }`}
          >
            <h3 className="text-3xl font-bold text-dark-gray mb-6">Nossa Missão</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Criamos experiências únicas e memoráveis através do planejamento
              meticuloso e execução impecável de eventos que refletem a personalidade
              e objetivos de nossos clientes.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-3xl font-bold text-primary-orange mb-2">150+</div>
                <div className="text-sm text-gray-600">Eventos Realizados</div>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-3xl font-bold text-primary-orange mb-2">10+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-3xl font-bold text-primary-orange mb-2">98%</div>
                <div className="text-sm text-gray-600">Satisfação</div>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-3xl font-bold text-primary-orange mb-2">24/7</div>
                <div className="text-sm text-gray-600">Suporte</div>
              </div>
            </div>

            <button
              onClick={scrollToContact}
              className="inline-block bg-primary-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors duration-300"
            >
              Fale Conosco
            </button>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <div
            ref={teamRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              teamVisible ? "animate-on-scroll visible" : "animate-on-scroll"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-dark-gray mb-6">
              Nossa Equipe
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard
              imageSrc="/api/images/TimeLuka/time_lucia.png"
              name="Lúcia Salgado"
              title="CEO"
              location="Belém - PA"
              index={0}
            />
            <TeamCard
              imageSrc="/api/images/TimeLuka/time_victor.png"
              name="Victor Santos"
              title="Diretor Comercial"
              location="Novo Hamburgo - RS"
              index={1}
            />
            <TeamCard
              imageSrc="/api/images/TimeLuka/time_leda.png"
              name="Lêda Salgado"
              title="Arquiteta"
              location="Belém - PA"
              index={2}
            />
            <TeamCard
              imageSrc="/api/images/TimeLuka/time_manuzza.png"
              name="Manuzza Franco"
              title="Executiva de Contas"
              location="Novo Hamburgo - RS"
              index={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
