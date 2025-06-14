import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Instagram, ExternalLink } from "lucide-react";

export default function Gallery() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nossos Detalhes em Ação
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Acompanhe nossos eventos e bastidores através do nosso Instagram oficial.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <Instagram size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Siga-nos no Instagram
              </h3>
              <p className="text-gray-600 mb-8">
                Veja os bastidores dos nossos eventos, dicas exclusivas e muito mais conteúdo sobre o mundo dos eventos.
              </p>
            </div>
            
            <a
              href="https://www.instagram.com/lukaevento/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Instagram size={24} />
              @lukaevento
              <ExternalLink size={20} />
            </a>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>Conecte-se conosco e faça parte da nossa comunidade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}