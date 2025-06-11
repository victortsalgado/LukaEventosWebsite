import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Play, Users, Award } from "lucide-react";

export default function Clients() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Depoimentos de Clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja o que nossos clientes falam sobre nossos eventos através de depoimentos exclusivos gravados durante os eventos.
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`transition-all duration-1000 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Placeholder para vídeos de testemunhais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white relative group cursor-pointer">
                  <div className="text-center">
                    <Play size={48} className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-lg font-semibold">Depoimento {index}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Cliente Evento {index}</h3>
                  <p className="text-gray-600 text-sm">Depoimento gravado durante o evento</p>
                </div>
              </div>
            ))}
          </div>

          {/* Estatísticas */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
                <p className="text-gray-600">Eventos Realizados</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Award size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">98%</h3>
                <p className="text-gray-600">Satisfação dos Clientes</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Play size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
                <p className="text-gray-600">Depoimentos em Vídeo</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              <strong>Nota:</strong> Os vídeos de depoimentos serão adicionados em breve. 
              Cada vídeo apresenta clientes reais compartilhando suas experiências durante nossos eventos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}