import { useEffect } from 'react';
import { Link } from 'wouter';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { 
  MapPin, 
  FileText, 
  Globe, 
  Building2, 
  Users, 
  Utensils, 
  ShieldCheck, 
  MonitorSpeaker, 
  Sofa, 
  Lightbulb,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function Cop30Page() {
  useEffect(() => {
    // SEO optimization
    document.title = "Luka Eventos: Sua Parceira Estratégica para a COP30 em Belém";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Soluções completas para eventos, stands e ativações na COP30. A Luka Eventos é a agência local em Belém com a expertise que você precisa para um evento de sucesso.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Soluções completas para eventos, stands e ativações na COP30. A Luka Eventos é a agência local em Belém com a expertise que você precisa para um evento de sucesso.';
      document.head.appendChild(meta);
    }

    // Cleanup function to restore original meta when component unmounts
    return () => {
      document.title = "Luka Eventos - Organização de Eventos em Belém, PA";
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Luka Eventos - Especialista em organização de eventos corporativos, feiras e congressos em Belém, PA. Experiência comprovada e excelência em cada projeto.');
      }
    };
  }, []);

  const services = [
    {
      icon: Building2,
      title: "Design e Montagem de Stands e Pavilhões",
      description: "Criação de espaços impactantes que destacam sua marca na COP30"
    },
    {
      icon: Users,
      title: "Produção de Eventos Paralelos e Ativações de Marca",
      description: "Eventos estratégicos que amplificam sua presença e engajamento"
    },
    {
      icon: Utensils,
      title: "Serviços Completos de Buffet e Hospitalidade",
      description: "Experiências gastronômicas que impressionam e conectam"
    },
    {
      icon: ShieldCheck,
      title: "Contratação e Gestão de Equipes",
      description: "Recepcionistas, seguranças e apoio especializado para seu evento"
    },
    {
      icon: MonitorSpeaker,
      title: "Locação de Mobiliário e Equipamentos Audiovisuais",
      description: "Tecnologia de ponta e mobiliário de qualidade para sua apresentação"
    },
    {
      icon: Lightbulb,
      title: "Consultoria Estratégica para Agências Parceiras",
      description: "Suporte especializado para maximizar o sucesso do seu projeto"
    }
  ];

  const whyLocal = [
    {
      icon: MapPin,
      title: "Logística Integrada",
      description: "Navegamos pela complexa logística de Belém, garantindo acesso aos melhores fornecedores, transporte e montagem, para que seu evento aconteça sem imprevistos."
    },
    {
      icon: FileText,
      title: "Conhecimento Burocrático",
      description: "Compreendemos as regulamentações locais e os processos do Hangar Centro de Convenções, agilizando licenças e garantindo conformidade total."
    },
    {
      icon: Globe,
      title: "Conexão Cultural",
      description: "Incorporamos a riqueza da cultura amazônica de forma autêntica, criando experiências que ressoam com um público global e respeitam as tradições locais."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org for COP30 Event and FAQ */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Event",
            "@id": "https://lukaeventos.com.br/cop30/#cop30-event",
            "name": "COP30 - 30ª Conferência das Partes sobre Mudanças Climáticas",
            "description": "A 30ª Conferência das Nações Unidas sobre Mudanças Climáticas (COP30) será realizada em Belém, PA, Brasil, em 2025",
            "startDate": "2025-11-10",
            "endDate": "2025-11-21",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Belém, Pará, Brasil",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Belém",
                "addressRegion": "PA", 
                "addressCountry": "BR"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "UNFCCC - United Nations Framework Convention on Climate Change"
            },
            "offers": {
              "@type": "Offer",
              "description": "Serviços de organização de eventos para a COP30 pela Luka Eventos",
              "seller": {
                "@id": "https://lukaeventos.com.br/#organization"
              }
            }
          },
          {
            "@type": "FAQPage",
            "@id": "https://lukaeventos.com.br/cop30/#faq",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Por que escolher a Luka Eventos para a COP30?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Luka Eventos é uma empresa local de Belém com mais de 15 anos de experiência em eventos corporativos. Conhecemos profundamente a cidade, temos uma rede consolidada de fornecedores locais e oferecemos preços competitivos por sermos baseados em Belém."
                }
              },
              {
                "@type": "Question", 
                "name": "Quais serviços a Luka Eventos oferece para a COP30?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oferecemos design e montagem de stands e pavilhões, produção de eventos paralelos e ativações de marca, logística e coordenação local, catering e hospitalidade, suporte técnico e audiovisual, segurança e credenciamento, transporte e hospedagem, e tradução e interpretação."
                }
              },
              {
                "@type": "Question",
                "name": "Qual é a vantagem de trabalhar com uma empresa local para a COP30?", 
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trabalhando com uma empresa local como a Luka Eventos, você tem acesso a conhecimento profundo da região, rede de fornecedores estabelecida, custos reduzidos de logística, resposta rápida a demandas, e suporte presencial durante todo o evento."
                }
              }
            ]
          },
          {
            "@type": "BreadcrumbList",
            "@id": "https://lukaeventos.com.br/cop30/#breadcrumb",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": "https://lukaeventos.com.br/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "COP30",
                "item": "https://lukaeventos.com.br/cop30"
              }
            ]
          }
        ]
      })}
      </script>

      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/cop30_1750046278318.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                COP30 em Belém: Da Estratégia à Execução Impecável, Somos a Sua Parceira Local
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Para agências e empresas que buscam excelência, a Luka Eventos oferece a expertise e a estrutura necessárias para realizar projetos de alto impacto durante a conferência.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    window.location.href = '/';
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="inline-flex items-center justify-center bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Planeje seu Evento na COP30 Conosco
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Local Partner Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que uma Parceira Local é Essencial?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                O sucesso na COP30 depende do conhecimento local. Veja como nossa expertise em Belém faz a diferença.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyLocal.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-full p-6 w-24 h-24 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-12 w-12 text-white mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossos Serviços para a COP30
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluções completas e especializadas para garantir o sucesso do seu projeto na maior conferência climática do mundo.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="bg-gradient-to-br from-primary-orange to-accent-gray rounded-full p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não deixe seu projeto da COP30 ao acaso
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              A complexidade de um evento global exige um parceiro local à altura. A Luka Eventos está pronta para ser o seu braço direito em Belém, assegurando que seu projeto seja executado com a excelência que sua marca merece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5591981553464"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Fale Conosco no WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <button
                onClick={() => {
                  window.location.href = '/';
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Solicitar Proposta
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  +10 anos de experiência
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Conhecimento local especializado
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Parceira confiável em Belém
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