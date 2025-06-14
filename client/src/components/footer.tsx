import { Instagram, Facebook, Linkedin, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
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
    <footer className="bg-dark-gray text-white py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 mb-4">
              <text x="10" y="32" fontFamily="serif" fontSize="28" fontWeight="300" fill="#3d4852" letterSpacing="3px">LUKA</text>
              <text x="10" y="52" fontFamily="serif" fontSize="14" fontWeight="300" fill="#ffffff" letterSpacing="2px">Eventos</text>
            </svg>
            <p className="text-gray-300 mb-6">
              Transformamos momentos especiais em experiências inesquecíveis. Com
              paixão, dedicação e excelência em cada detalhe.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/lukaevento/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-gray transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61553048040229"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-gray transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/97838556"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-gray transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-primary-orange transition-colors duration-300"
                >
                  Organização e Consultoria
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-primary-orange transition-colors duration-300"
                >
                  Produção de Stands
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-primary-orange transition-colors duration-300"
                >
                  Buffet e Locação
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-primary-orange transition-colors duration-300"
                >
                  Equipes Especializadas
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Phone className="mr-2 text-primary-orange" size={16} />
                (91) 9 8155-3464
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-primary-orange" size={16} />
                contato@lukaeventos.com.br
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Luka Eventos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
