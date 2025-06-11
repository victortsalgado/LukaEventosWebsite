// Configuration for images stored in object storage
export const imageConfig = {
  // Team member photos
  team: {
    lucia: "TimeLuka/time_lucia.png",
    victor: "TimeLuka/time_victor.png", 
    leda: "TimeLuka/time_leda.png",
    manuzza: "TimeLuka/time_manuzza.png"
  },
  
  // Portfolio project images
  portfolio: {
    marata: "Feiras/supernorte_marata.png",
    bendo: "Feiras/supernorte_bendo_alimentos.png",
    okajima: "Feiras/supernorte_okajima.png",
    tramontina: "Feiras/exposibram_dinamica.png"
  },
  
  // Service images
  services: {
    organizacao: "Servicos/consultoria.jpg",
    producao: "Servicos/producao_stands.jpg",
    buffet: "Buffet/buffet_tabuadefrios.png",
    equipes: "Equipes/promotoras_1.png"
  },
  
  // Gallery images
  gallery: {
    decoracao: "Decoracao/paisagismo.jpg",
    locacao: "Locacao/locacao_mesa_cadeira.png",
    mascotes: "Mascotes/mascotes.png"
  }
};

// Helper function to get image URL
export function getImageUrl(folder: string, filename: string): string {
  return `/api/images/${folder}/${filename}`;
}

// Helper function to get image by key
export function getTeamImage(member: keyof typeof imageConfig.team): string {
  const imagePath = imageConfig.team[member];
  if (!imagePath) return '';
  const [folder, filename] = imagePath.split('/');
  return getImageUrl(folder, filename);
}

export function getPortfolioImage(project: keyof typeof imageConfig.portfolio): string {
  const imagePath = imageConfig.portfolio[project];
  if (!imagePath) return '';
  const [folder, filename] = imagePath.split('/');
  return getImageUrl(folder, filename);
}

export function getServiceImage(service: keyof typeof imageConfig.services): string {
  const imagePath = imageConfig.services[service];
  if (!imagePath) return '';
  const [folder, filename] = imagePath.split('/');
  return getImageUrl(folder, filename);
}

export function getGalleryImage(item: keyof typeof imageConfig.gallery): string {
  const imagePath = imageConfig.gallery[item];
  if (!imagePath) return '';
  const [folder, filename] = imagePath.split('/');
  return getImageUrl(folder, filename);
}