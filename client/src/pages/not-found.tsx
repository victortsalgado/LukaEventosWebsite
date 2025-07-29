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
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
