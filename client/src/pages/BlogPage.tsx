import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import caseOkajimaImage from "@assets/Case_okajima_foto1_1750041688851.jpg";

export default function BlogPage() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const blogPosts = [
    {
      id: 1,
      title: "Case de Sucesso: Okajima na SUPERNORTE 2024",
      excerpt: "Veja como a Luka Eventos planejou e executou um stand de impacto para a Okajima em um dos maiores eventos da Amazônia.",
      author: "Luka Eventos",
      date: "15 de Janeiro, 2025",
      readTime: "8 min de leitura",
      image: caseOkajimaImage,
      link: "/blog/case-okajima-supernorte-2024"
    },
    {
      id: 2,
      title: "Tendências em Stands para Feiras 2025",
      excerpt: "Conheça as últimas tendências em design de stands, tecnologias interativas e estratégias que fazem sua marca se destacar nas principais feiras do país.",
      author: "Luka Eventos",
      date: "10 de Janeiro, 2025",
      readTime: "7 min de leitura"
    },
    {
      id: 3,
      title: "Case de Sucesso: Exposibram 2024",
      excerpt: "Acompanhe os bastidores e resultados do nosso trabalho na Exposibram 2024, onde criamos stands únicos que geraram grande impacto para nossos clientes.",
      author: "Luka Eventos",
      date: "5 de Janeiro, 2025",
      readTime: "6 min de leitura"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={titleRef}
              className={`text-center transition-all duration-1000 ${
                titleVisible ? "animate-on-scroll visible" : "animate-on-scroll"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Insights e Novidades do Mundo de Eventos
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Cases de sucesso, dicas de planejamento e as últimas tendências do setor para garantir que seu próximo evento seja inesquecível.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-20 bg-section-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              ref={contentRef}
              className={`transition-all duration-1000 ${
                contentVisible ? "animate-on-scroll visible" : "animate-on-scroll"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${
                      contentVisible ? "animate-on-scroll visible" : "animate-on-scroll"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {/* Post Image */}
                    {post.image ? (
                      <div className="h-56 w-full overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-primary-orange to-accent-gray h-56 w-full flex items-center justify-center">
                        <div className="text-white text-center">
                          <Calendar size={48} className="mx-auto mb-2 opacity-60" />
                          <p className="text-sm opacity-80">Imagem do Artigo</p>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      {/* Post Meta */}
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <User size={16} className="mr-2" />
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Post Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Post Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read More Button */}
                      {post.link ? (
                        <Link href={post.link} className="inline-flex items-center text-primary-orange font-semibold hover:text-accent-gray transition-colors duration-300">
                          Leia Mais
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      ) : (
                        <button className="inline-flex items-center text-primary-orange font-semibold hover:text-accent-gray transition-colors duration-300">
                          Leia Mais
                          <ArrowRight size={16} className="ml-2" />
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Quer estar sempre atualizado?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Acompanhe nossas redes sociais para não perder nenhuma novidade sobre o mundo dos eventos.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://www.instagram.com/lukaevento/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-primary-orange text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity duration-300"
                    >
                      Seguir no Instagram
                    </a>
                    <a
                      href="https://wa.me/5591981553464"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border-2 border-primary-orange text-primary-orange px-6 py-3 rounded-full font-semibold hover:bg-primary-orange hover:text-white transition-all duration-300"
                    >
                      Fale Conosco
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