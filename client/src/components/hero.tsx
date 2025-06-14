import { Calendar, Images } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

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
      className="relative min-h-screen flex items-center justify-center bg-light-background overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><g fill='none' fill-rule='evenodd'><g fill='%23D4A24E' fill-opacity='0.05'><circle cx='30' cy='30' r='2'/></g></g></svg>")`,
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
          <img 
            src="/api/images/Branding/Nome%20Preto%20Sem%20Fundo.png" 
            alt="Logo da Luka Eventos" 
            className="mx-auto h-16 mb-6"
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-text mb-6 leading-tight">
          Transformamos seu evento em um{" "}
          <span className="text-primary-gold block mt-2">marco de sucesso</span>
        </h1>
        <p className="text-xl md:text-2xl text-secondary-text mb-8 max-w-3xl mx-auto leading-relaxed">
          Planejamento, organização e produção de feiras, congressos e eventos corporativos em todo o Brasil.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center bg-primary-gold text-light-background px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Calendar className="mr-2" size={20} />
            Solicite um Orçamento
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="inline-flex items-center border-2 border-primary-orange text-primary-orange px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-orange hover:text-white transition-all duration-300"
          >
            <Images className="mr-2" size={20} />
            Conheça Nosso Portfólio
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce-gentle">
        <div className="w-16 h-16 bg-primary-orange opacity-20 rounded-full" />
      </div>
      <div
        className="absolute bottom-20 right-10 animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-12 h-12 bg-primary-orange opacity-30 rounded-full" />
      </div>
    </section>
  );
}
