export const TeamMemberPlaceholder = ({ name, role }: { name: string; role: string }) => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="rounded-full">
    <defs>
      <linearGradient id={`gradient-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6600" />
        <stop offset="100%" stopColor="#FF9944" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="100" fill={`url(#gradient-${name})`} />
    <circle cx="100" cy="75" r="25" fill="white" opacity="0.9" />
    <path d="M 60 140 Q 100 120 140 140 L 140 160 Q 100 150 60 160 Z" fill="white" opacity="0.9" />
    <text x="100" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
      {name}
    </text>
  </svg>
);

export const PortfolioPlaceholder = ({ title }: { title: string }) => (
  <svg width="400" height="300" viewBox="0 0 400 300" className="rounded-lg">
    <defs>
      <linearGradient id={`portfolio-${title}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4f4f4" />
        <stop offset="50%" stopColor="#FF6600" opacity="0.1" />
        <stop offset="100%" stopColor="#333333" opacity="0.1" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill={`url(#portfolio-${title})`} />
    <rect x="50" y="50" width="100" height="80" fill="#FF6600" opacity="0.3" rx="8" />
    <rect x="170" y="50" width="100" height="80" fill="#FF6600" opacity="0.2" rx="8" />
    <rect x="290" y="50" width="60" height="80" fill="#FF6600" opacity="0.4" rx="8" />
    <rect x="50" y="150" width="300" height="20" fill="#333333" opacity="0.2" rx="4" />
    <rect x="50" y="180" width="200" height="15" fill="#333333" opacity="0.1" rx="4" />
    <text x="200" y="260" textAnchor="middle" fill="#333333" fontSize="16" fontWeight="bold">
      {title}
    </text>
  </svg>
);

export const ServicePlaceholder = ({ service }: { service: string }) => (
  <svg width="300" height="200" viewBox="0 0 300 200" className="rounded-lg">
    <defs>
      <linearGradient id={`service-${service}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6600" opacity="0.1" />
        <stop offset="100%" stopColor="#333333" opacity="0.05" />
      </linearGradient>
    </defs>
    <rect width="300" height="200" fill={`url(#service-${service})`} />
    <circle cx="150" cy="70" r="30" fill="#FF6600" opacity="0.3" />
    <rect x="120" y="45" width="60" height="50" fill="none" stroke="#FF6600" strokeWidth="2" opacity="0.6" />
    <text x="150" y="130" textAnchor="middle" fill="#333333" fontSize="14" fontWeight="600">
      {service}
    </text>
    <rect x="50" y="150" width="200" height="8" fill="#FF6600" opacity="0.2" rx="4" />
  </svg>
);

export const GalleryPlaceholder = ({ index }: { index: number }) => (
  <svg width="300" height="250" viewBox="0 0 300 250" className="rounded-lg">
    <defs>
      <linearGradient id={`gallery-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4f4f4" />
        <stop offset="50%" stopColor="#FF6600" opacity="0.1" />
        <stop offset="100%" stopColor="#333333" opacity="0.1" />
      </linearGradient>
    </defs>
    <rect width="300" height="250" fill={`url(#gallery-${index})`} />
    <rect x="30" y="30" width="80" height="60" fill="#FF6600" opacity="0.3" rx="6" />
    <rect x="120" y="30" width="80" height="60" fill="#FF6600" opacity="0.2" rx="6" />
    <rect x="210" y="30" width="60" height="60" fill="#FF6600" opacity="0.4" rx="6" />
    <rect x="30" y="100" width="240" height="80" fill="#333333" opacity="0.1" rx="8" />
    <circle cx="150" cy="140" r="20" fill="#FF6600" opacity="0.5" />
    <text x="150" y="220" textAnchor="middle" fill="#333333" fontSize="12" fontWeight="500">
      Galeria de Eventos
    </text>
  </svg>
);