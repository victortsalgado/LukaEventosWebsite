import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Play, Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import caseOkajimaImage from "@assets/Case_okajima_foto1_1750041688851.jpg";

export default function CaseOkajima() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Case de Sucesso: Okajima na SUPERNORTE 2024 | Luka Eventos";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Veja como a Luka Eventos planejou e executou um stand de 100m² para a Okajima na SUPERNORTE 2024, com soluções de design, funcionalidade e hospitalidade.');

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
                <span>15 de Janeiro, 2025</span>
                <span className="mx-2">•</span>
                <span>8 min de leitura</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                Case de Sucesso: O Stand de Impacto da Okajima na SUPERNORTE 2024, por Luka Eventos
              </h1>

              {/* Featured Image */}
              <div className="mb-6">
                <img
                  src={caseOkajimaImage}
                  alt="Jansen Barros, Diretor de Marketing da Okajima, em conversa com Lúcia Salgado, CEO da Luka Eventos"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-3 italic text-center">
                  Jansen Barros, Diretor de Marketing da Okajima, em conversa com Lúcia Salgado, CEO da Luka Eventos, no stand da SUPERNORTE 2024.
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
                  Quando um gigante da distribuição como a Okajima participa de um dos maiores eventos do setor na Amazônia, a SUPERNORTE, a presença precisa ser mais do que um simples stand: precisa ser uma declaração de força, organização e liderança. Em outubro de 2024, a Luka Eventos teve a honra de aceitar este desafio, transformando um espaço de 100m² no Hangar Centro de Convenções em uma experiência de marca inesquecível.
                </p>

                {/* Challenge */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">O Desafio: Criar um Ponto de Encontro Memorável e Funcional</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  O objetivo da Okajima era claro: criar um stand na SUPERNORTE 2024 que não apenas se destacasse visualmente em meio a um evento de grande porte, mas que também fosse extremamente funcional para a equipe, confortável para os visitantes e que expusesse seus produtos de forma estratégica. O espaço precisava facilitar o networking, acomodar reuniões e, acima de tudo, reforçar a imagem de excelência da marca.
                </p>

                {/* Solution */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">A Solução da Luka Eventos: Planejamento Detalhado e Execução Impecável</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Nossa equipe trabalhou em estreita colaboração com a Okajima para desenvolver um projeto que atendesse a todas as necessidades, desde a estrutura macro até os mínimos detalhes de acabamento.
                </p>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Estrutura e Design de Impacto:</strong> Projetamos um stand de 100m² (10x10m) com um piso elevado para criar uma presença dominante, incluindo uma rampa lateral para garantir total acessibilidade. As paredes e a marquise foram construídas em carpintaria personalizada, com uma iluminação de spots estrategicamente posicionada para valorizar cada detalhe, seguindo o projeto à risca.
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Funcionalidade e Tecnologia:</strong> Um depósito robusto de 12m² foi integrado à estrutura, com prateleiras internas e uma porta com chave para segurança. Pensando na necessidade de mídia do cliente, criamos uma parede especial com encaixe perfeito para um grande painel de LED (fornecido pela Okajima), garantindo uma integração limpa e profissional.
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Exposição Estratégica de Produtos:</strong> Para destacar os produtos da Okajima, desenvolvemos quatro grandes vitrines personalizadas, cada uma com três níveis de prateleiras iluminadas e fechamento em acrílico. Adicionalmente, criamos duas vitrines em formato de nicho, também com iluminação individual, transformando os produtos em verdadeiras peças de exposição.
                </p>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  <strong>Ambientação e Conforto:</strong> O espaço foi mobiliado com 10 mesas e 40 cadeiras de design para acomodar os visitantes com conforto. Um grande cachepô com plantas naturais, que receberam manutenção durante os três dias do evento, trouxe um toque de sofisticação e natureza ao ambiente.
                </p>

                <p className="text-gray-700 mb-8 leading-relaxed">
                  <strong>Gestão Completa do Projeto:</strong> Nosso serviço incluiu a montagem e desmontagem de toda a estrutura e a supervisão contínua durante todos os dias do evento, garantindo que a equipe da Okajima pudesse focar exclusivamente em seus negócios, com a tranquilidade de que tudo funcionaria perfeitamente.
                </p>

                {/* Results */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Resultados e o Veredito do Cliente</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  O resultado foi um dos stands mais comentados da SUPERNORTE 2024, um espaço que combinou estética sofisticada com máxima funcionalidade. A satisfação do nosso cliente é a nossa maior métrica de sucesso. Tivemos a honra de receber um depoimento em vídeo de Jansen Barros, Diretor de Marketing da Okajima, que compartilhou sua experiência positiva com o trabalho da Luka Eventos.
                </p>

                {/* YouTube Video */}
                <div className="relative w-full aspect-video my-8">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full" 
                    src="https://www.youtube.com/embed/oGpSgvBGCPc" 
                    title="Depoimento Okajima: O Sucesso do Stand na SUPERNORTE 2024 com a Luka Eventos" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                  </iframe>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic text-center">
                  Depoimento de Jansen Barros, Diretor de Marketing da Okajima
                </p>

                {/* Conclusion */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusão</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  O projeto para a Okajima na SUPERNORTE 2024 exemplifica a filosofia da Luka Eventos: transformar as necessidades de um cliente em um evento estratégico e bem-sucedido. Cuidamos de cada detalhe para que a única preocupação do nosso cliente seja brilhar.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  <strong>Pronto para transformar seu próximo evento em um case de sucesso? Fale com a nossa equipe.</strong>
                </p>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-primary-orange to-accent-gray rounded-2xl p-8 text-center text-white mt-12">
                  <h3 className="text-2xl font-bold mb-4">
                    Transforme Seu Próximo Evento em um Case de Sucesso
                  </h3>
                  <p className="mb-6 text-lg opacity-90">
                    Entre em contato e descubra como podemos criar uma experiência inesquecível para sua marca.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/5591981553464"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white text-primary-orange px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      💬 Fale Conosco no WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary-orange transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Solicitar Orçamento
                    </button>
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