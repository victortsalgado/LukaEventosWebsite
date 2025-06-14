import { Calendar, Images } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import AnimatedButton from "./AnimatedButton";

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden"
    >
      {/* Logo da Luka no canto superior esquerdo */}
      <div className="absolute top-6 left-6 z-20 p-2">
        <img 
          src="/images/logo-luka.png" 
          alt="Logo Luka Eventos" 
          className="h-20 w-20 md:h-24 md:w-24 opacity-95 hover:opacity-100 transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23ea5a0c' fill-opacity='0.4'><circle cx='30' cy='30' r='2'/></g></g></svg>")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="mb-8">
          <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <text x="10" y="32" fontFamily="serif" fontSize="28" fontWeight="300" fill="#3d4852" letterSpacing="3px">LUKA</text>
            <text x="10" y="52" fontFamily="serif" fontSize="14" fontWeight="300" fill="#ffffff" letterSpacing="2px">Eventos</text>
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Transformamos seu evento em um{" "}
          <span className="text-primary-gray block mt-2">marco de sucesso</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Planejamento, organização e produção de feiras, congressos e eventos corporativos em todo o Brasil.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <AnimatedButton 
            onClick={() => scrollToSection("contact")}
            icon={<Calendar size={20} />}
          >
            Solicite um Orçamento
          </AnimatedButton>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            <Images className="mr-2" size={20} />
            Conheça Nosso Portfólio
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce-gentle">
        <div className="w-16 h-16 bg-primary-gray opacity-20 rounded-full" />
      </div>
      <div
        className="absolute bottom-20 right-10 animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-12 h-12 bg-accent-gray opacity-30 rounded-full" />
      </div>
    </section>
  );
}
