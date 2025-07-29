import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    // SEO Meta Tags for 404 page
    document.title = "Página Não Encontrada | Luka Eventos";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'A página que você procura não foi encontrada. Explore nossos serviços de organização de eventos corporativos em Belém ou retorne à página inicial da Luka Eventos.');

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = "Luka Eventos | Empresa de Organização de Eventos em Belém-PA";
      const originalMeta = document.querySelector('meta[name="description"]');
      if (originalMeta) {
        originalMeta.setAttribute('content', 'Planejamento e produção de eventos corporativos, feiras e congressos em Belém. A Luka Eventos oferece soluções completas, de stands a buffet. Fale conosco!');
      }
    };
  }, []);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardContent className="pt-8 pb-8 px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Página Não Encontrada</h1>
            <p className="text-lg text-gray-600 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
            <div className="space-y-4 text-left bg-gray-100 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800">O que você pode fazer:</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• Verificar se o endereço foi digitado corretamente</li>
                <li>• Usar o menu de navegação para encontrar o que procura</li>
                <li>• Visitar nossa página inicial para explorar nossos serviços</li>
                <li>• Entrar em contato conosco se precisar de ajuda</li>
              </ul>
            </div>
            <div className="mt-8">
              <a 
                href="/" 
                className="inline-flex items-center px-6 py-3 bg-primary-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Voltar à Página Inicial
              </a>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Se você acredita que isso é um erro, entre em contato conosco:</p>
              <p className="mt-2">
                <strong>Email:</strong> contato@lukaeventos.com.br<br/>
                <strong>WhatsApp:</strong> (91) 98155-3464
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
