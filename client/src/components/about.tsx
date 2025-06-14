import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import TeamCard from "@/components/TeamCard";
import { getTeamImage } from "@shared/imageConfig";

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
    <section id="about" className="py-20 bg-section-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-gold mb-6">
            Experiência que Gera Resultados
          </h2>
          <p className="text-xl text-secondary-text max-w-3xl mx-auto">
            Somos um time experiente, coordenando várias equipes capacitadas e prontas para acertar cada detalhe. A diretora Lúcia Salgado é acessível e fará com que tudo saia como o esperado, além de preparar o time para qualquer situação.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            ref={contentRef}
            className={`text-center transition-all duration-1000 ${
              contentVisible ? "animate-on-scroll visible" : "animate-on-scroll"
            }`}
          >
            <h3 className="text-3xl font-bold text-primary-gold mb-6">Nossa Missão</h3>
            <p className="text-lg text-secondary-text mb-6 leading-relaxed">
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
                <div className="text-3xl font-bold text-primary-orange mb-2">15+</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-3xl font-bold text-primary-orange mb-2">5000+</div>
                <div className="text-sm text-gray-600">Metros quadrados de standes construídos</div>
              </div>
              <div className="text-center p-6 bg-light-gray rounded-xl">
                <div className="text-3xl font-bold text-primary-orange mb-2">24/7</div>
                <div className="text-sm text-gray-600">Suporte</div>
              </div>
            </div>

            <button
              onClick={scrollToContact}
              className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg"
            >
              Fale Conosco
            </button>
          </div>
        </div>

        {/* Seção da CEO Lúcia Salgado */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              ref={teamRef}
              className={`order-2 md:order-1 transition-all duration-1000 ${
                teamVisible ? "animate-on-scroll visible" : "animate-on-scroll"
              }`}
            >
              <h2 className="text-4xl font-bold text-dark-gray mb-6">
                Conheça Nossa CEO
              </h2>
              <h3 className="text-2xl font-semibold text-primary-orange mb-6">
                Lúcia Salgado
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Com mais de 15 anos de experiência no mercado de eventos, Lúcia Salgado é a mente estratégica 
                por trás da Luka Eventos. Sua expertise abrange desde a concepção até a execução de projetos 
                complexos, sempre com foco na excelência e inovação.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                O que diferencia Lúcia no mercado é sua profunda rede de relacionamentos com fornecedores 
                locais em Belém e região. Essa confiança construída ao longo dos anos garante que cada evento 
                seja executado com a mais alta qualidade, pontualidade e custo-benefício.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sob sua liderança, a Luka Eventos se tornou sinônimo de confiabilidade e inovação, 
                transformando cada projeto em uma experiência única e memorável para clientes e participantes.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-lg opacity-20"></div>
                <img
                  src={getTeamImage('lucia')}
                  alt="Lúcia Salgado - CEO da Luka Eventos"
                  className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seção da Arquiteta Leda Salgado */}
        <div className="mt-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-lg opacity-20"></div>
                <img
                  src={getTeamImage('leda')}
                  alt="Lêda Salgado - Arquiteta da Luka Eventos"
                  className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-dark-gray mb-6">
                Conheça Nossa Arquiteta
              </h2>
              <h3 className="text-2xl font-semibold text-primary-orange mb-6">
                Lêda Salgado
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Lêda Salgado é a mente criativa responsável por dar vida aos espaços dos eventos da Luka. 
                Formada em Arquitetura, ela traz uma visão única que vai além dos eventos, incorporando 
                sua experiência em projetos residenciais e comerciais.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Na Luka Eventos, Lêda é responsável pelos serviços de <strong>projeto 3D, decoração, iluminação 
                e paisagismo</strong>. Sua capacidade de visualizar e materializar conceitos permite criar ambientes 
                que não apenas impressionam visualmente, mas também proporcionam experiências inesquecíveis.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Seu portfólio inclui projetos arquitetônicos diversos, mas é nos eventos que sua criatividade 
                realmente brilha, transformando espaços comuns em cenários extraordinários que contam histórias 
                e conectam pessoas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
