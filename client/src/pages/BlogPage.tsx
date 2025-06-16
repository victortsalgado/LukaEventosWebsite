import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import caseOkajimaImage from "@assets/Case_okajima_foto1_1750041688851.jpg";
import cop30Image from "@assets/cop30_1750046278318.jpg";

export default function BlogPage() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  const blogPosts = [
    {
      id: 1,
      title: "Guia COP30: Como Escolher seu Parceiro de Eventos em Belém",
      excerpt: "Prepare sua agência para a COP30 em Belém. Saiba por que um parceiro local de execução é crucial e como a Luka Eventos pode garantir o sucesso do seu evento.",
      author: "Luka Eventos",
      date: "16 de Janeiro, 2025",
      readTime: "6 min de leitura",
      image: cop30Image,
      link: "/blog/guia-cop30-parceiro-local"
    },
    {
      id: 2,
      title: "Case de Sucesso: Okajima na SUPERNORTE 2024",
      excerpt: "Veja como a Luka Eventos planejou e executou um stand de impacto para a Okajima em um dos maiores eventos da Amazônia.",
      author: "Luka Eventos",
      date: "15 de Janeiro, 2025",
      readTime: "8 min de leitura",
      image: caseOkajimaImage,
      link: "/blog/case-okajima-supernorte-2024"
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
                      href="https://www.instagram.com/lukaevento"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{
                        background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transform transition-transform duration-700 group-hover:translate-x-full"></span>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
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