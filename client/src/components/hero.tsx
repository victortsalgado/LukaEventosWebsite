import { Calendar, Images } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import AnimatedButton from "./AnimatedButton";
import AnimatedText from "./AnimatedText";

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
        <div className="mb-6 sm:mb-8">
          <img 
            src="/images/logo-luka.png" 
            alt="Logo Luka Eventos" 
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain mx-auto filter brightness-150 opacity-20 hover:opacity-30 transition-all duration-500"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">Transformamos seu evento</span>
          <span className="block">em um <AnimatedText /></span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Planejamento, organização e produção de feiras, congressos e eventos corporativos em todo o Brasil.
        </p>
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row sm:justify-center px-4">
          <AnimatedButton 
            onClick={() => scrollToSection("contact")}
            icon={<Calendar size={20} />}
          >
            Solicite um Orçamento
          </AnimatedButton>
          <button
            onClick={() => scrollToSection("gallery")}
            className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            <Images className="mr-2" size={20} />
            Conheça Nosso Portfólio
          </button>
        </div>
      </div>

      {/* Floating Elements - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 animate-bounce-gentle">
        <div className="w-16 h-16 bg-primary-gray opacity-20 rounded-full" />
      </div>
      <div
        className="hidden md:block absolute bottom-20 right-10 animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-12 h-12 bg-accent-gray opacity-30 rounded-full" />
      </div>
    </section>
  );
}
