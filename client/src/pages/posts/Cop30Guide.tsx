import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Calendar, User, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import cop30Image from "@assets/cop30_1750046278318.jpg";

export default function Cop30Guide() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Guia COP30: Como Agências Podem Escolher um Parceiro de Eventos em Belém | Luka Eventos";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Prepare sua agência para a COP30 em Belém. Saiba por que um parceiro local de execução é crucial e como a Luka Eventos pode garantir o sucesso do seu evento.');

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = "Luka Eventos - Organização de Eventos Corporativos em Belém, PA";
      const originalMeta = document.querySelector('meta[name="description"]');
      if (originalMeta) {
        originalMeta.setAttribute('content', 'Luka Eventos oferece serviços completos de organização de eventos corporativos, feiras e congressos em Belém, PA. Transformamos ideias em experiências inesquecíveis.');
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Blog Link */}
            <Link href="/blog" className="inline-flex items-center text-primary-orange hover:text-accent-gray transition-colors duration-300 mb-8">
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao Blog
            </Link>

            <div
              ref={heroRef}
              className={`transition-all duration-1000 ${
                heroVisible ? "animate-on-scroll visible" : "animate-on-scroll"
              }`}
            >
              {/* Article Meta */}
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <User size={16} className="mr-2" />
                <span>Luka Eventos</span>
                <span className="mx-2">•</span>
                <Calendar size={16} className="mr-2" />
                <span>16 de Janeiro, 2025</span>
                <span className="mx-2">•</span>
                <span>6 min de leitura</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                COP30 em Belém: O Guia Definitivo para Agências Nacionais e Internacionais Encontrarem o Parceiro de Execução Perfeito
              </h1>

              {/* Featured Image */}
              <div className="mb-6">
                <img
                  src={cop30Image}
                  alt="COP30 Amazônia - United Nations Climate Change Conference"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3 italic text-center">
                  COP30 Amazônia - Belém, Brasil, 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-section-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={contentRef}
              className={`prose prose-lg max-w-none transition-all duration-1000 ${
                contentVisible ? "animate-on-scroll visible" : "animate-on-scroll"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {/* Introduction */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  A COP30 está prestes a transformar Belém do Pará no epicentro das discussões climáticas globais. Para agências de marketing e eventos de todo o Brasil e do mundo, isso representa uma oportunidade única de realizar ativações de marca, eventos paralelos e recepções de alto nível. Contudo, o sucesso em um palco tão complexo e com uma logística tão particular depende de um fator crucial que muitas vezes é subestimado: a execução local. Como garantir uma operação impecável quando sua equipe está a milhares de quilômetros de distância?
                </p>

                {/* Competitive Advantage */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">A Vantagem Competitiva da Expertise Local</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Organizar um evento em Belém, especialmente durante um acontecimento da magnitude da COP30, vai muito além de reservar um espaço. Agências de fora da região enfrentam desafios que só uma equipe local experiente pode prever e solucionar com agilidade. A expertise local é a sua maior vantagem competitiva. Um parceiro estabelecido em Belém possui um conhecimento profundo sobre:
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong className="text-gray-900">Fornecedores Confiáveis:</strong>
                      <span className="text-gray-700"> Acesso direto aos melhores buffets, empresas de audiovisual, segurança e transporte da região.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong className="text-gray-900">Logística e Regulamentação:</strong>
                      <span className="text-gray-700"> Entendimento dos trâmites burocráticos do Hangar Centro de Convenções e de outras venues, além da logística de transporte e montagem na cidade.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <strong className="text-gray-900">Cultura Regional:</strong>
                      <span className="text-gray-700"> Capacidade de integrar elementos da rica cultura amazônica de forma autêntica e respeitosa, criando experiências mais ricas para os participantes.</span>
                    </div>
                  </li>
                </ul>

                {/* Checklist */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Checklist: O que Exigir do seu Parceiro de Execução em Belém?</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Antes de fechar uma parceria, certifique-se de que seu fornecedor local atenda a estes critérios essenciais:
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1 flex-shrink-0 font-bold">✅</span>
                    <div>
                      <strong className="text-gray-900">Portfólio Robusto:</strong>
                      <span className="text-gray-700"> Verifique se a empresa possui experiência comprovada na organização e produção de eventos de grande porte, como feiras e congressos. Peça para ver cases de sucesso.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1 flex-shrink-0 font-bold">✅</span>
                    <div>
                      <strong className="text-gray-900">Estrutura de Gestão Completa:</strong>
                      <span className="text-gray-700"> O parceiro ideal deve ser capaz de gerenciar múltiplos serviços de forma integrada, oferecendo uma solução "one-stop-shop".</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1 flex-shrink-0 font-bold">✅</span>
                    <div>
                      <strong className="text-gray-900">Capacidade de Personalização:</strong>
                      <span className="text-gray-700"> A empresa tem estrutura para criar projetos personalizados, como stands em marcenaria e soluções de cenografia que fujam do básico?</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1 flex-shrink-0 font-bold">✅</span>
                    <div>
                      <strong className="text-gray-900">Comprovação de Sucesso:</strong>
                      <span className="text-gray-700"> Depoimentos de outros clientes, especialmente de grandes marcas, são o selo de qualidade que garante a tranquilidade da sua agência.</span>
                    </div>
                  </li>
                </ul>

                {/* Luka Eventos */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Luka Eventos: Seu Braço Direito para a COP30</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  A Luka Eventos nasceu e cresceu em Belém, e por mais de uma década tem sido a parceira estratégica de grandes marcas e agências nacionais para a execução de seus eventos mais importantes na região amazônica. Nossa metodologia de trabalho se baseia em ser o seu "braço direito" em Belém, traduzindo as expectativas de agências de fora em uma execução local impecável, com a qualidade e o padrão que seus clientes exigem.
                </p>

                {/* Conclusion */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A COP30 é uma oportunidade histórica. Não deixe que desafios logísticos ou a falta de conhecimento local coloquem em risco o seu projeto. A escolha de um parceiro de execução experiente e estabelecido em Belém não é um custo, mas um investimento na garantia do sucesso.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  <strong>Sua agência está planejando ações para a COP30? Vamos conversar sobre como a Luka Eventos pode ser a sua parceira estratégica em Belém. Entre em contato conosco.</strong>
                </p>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-center text-white mt-12">
                  <h3 className="text-2xl font-bold mb-4">
                    Prepare sua Agência para a COP30
                  </h3>
                  <p className="mb-6 text-lg opacity-90">
                    Entre em contato e descubra como podemos ser seu parceiro local de confiança em Belém.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/5591981553464"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300"
                    >
                      Fale Conosco no WhatsApp
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
                    >
                      Solicitar Proposta
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}