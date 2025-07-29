# Luka Eventos - Event Management Website

Um site moderno e profissional para a Luka Eventos, empresa especializada em organização de eventos corporativos em Belém, PA, Brasil.

## 🌟 Características

- **Design Responsivo**: Experiência otimizada para desktop e mobile
- **Animações Suaves**: Transições e efeitos visuais profissionais
- **SEO Otimizado**: Meta tags e estrutura otimizada para mecanismos de busca
- **Sistema de Blog**: Páginas de blog com cases de sucesso e conteúdo estratégico
- **Landing Page COP30**: Página especializada para eventos da COP30
- **Gestão de Imagens**: Sistema automatizado com Replit Object Storage
- **Formulário de Contato**: Integração com SendGrid para emails

## 🚀 Tecnologias

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Wouter** para roteamento
- **Radix UI** componentes de interface
- **TanStack Query** para gerenciamento de estado
- **Framer Motion** para animações

### Backend
- **Node.js** com Express.js
- **PostgreSQL** com Drizzle ORM
- **Replit Object Storage** para imagens
- **SendGrid** para emails transacionais

### Ferramentas de Desenvolvimento
- **Vite** para build e desenvolvimento
- **TypeScript** para tipagem
- **PostCSS** para processamento CSS

## 📁 Estrutura do Projeto

```
luka-eventos/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   └── lib/           # Utilitários e configurações
├── server/                 # Backend Express
├── shared/                 # Schemas e tipos compartilhados
├── public/                 # Assets estáticos
└── attached_assets/        # Assets do projeto
```

## 🎯 Funcionalidades

### Páginas Principais
- **Home**: Página principal com hero, serviços, portfólio e contato
- **COP30**: Landing page especializada para eventos da COP30
- **Blog**: Sistema de blog com posts sobre cases de sucesso
- **404**: Página personalizada para erros

### Seções Interativas
- **Hero Section**: Introdução animada com call-to-action
- **Serviços**: Carrossel de imagens dinâmico
- **Portfólio**: Showcase de projetos reais
- **Equipe**: Seção sobre a equipe
- **Jornada**: Metodologia em 5 etapas
- **Contato**: Formulário com validação em tempo real
- **Clientes**: Carrossel animado de logos de clientes

## 🛠️ Instalação e Execução

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/luka-eventos.git
cd luka-eventos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
DATABASE_URL=sua_url_do_postgresql
SENDGRID_API_KEY=sua_chave_sendgrid
SESSION_SECRET=sua_chave_secreta
```

4. **Execute em desenvolvimento**
```bash
npm run dev
```

5. **Build para produção**
```bash
npm run build
```

## 🎨 Design System

### Tipografia
- **Poppins**: Fonte principal (sans-serif)
- **Crimson Text**: Fonte secundária (serif)

### Paleta de Cores
- **Ouro Principal**: #D4A24E
- **Verde COP30**: #16a34a
- **Tons de Cinza**: Variações para texto e backgrounds

## 📱 Responsividade

O site foi desenvolvido com abordagem mobile-first, garantindo uma experiência perfeita em:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Integrações

### Replit Object Storage
- Armazenamento automático de imagens
- Carregamento dinâmico por pastas
- Cache de 10 minutos para performance

### SendGrid
- Envio de emails de contato
- Templates personalizados
- Notificações automáticas

### WhatsApp
- Botão direto para contato
- Link personalizado com número da empresa

## 📈 SEO e Performance

- **Meta tags dinâmicas** por página
- **Schema markup** para negócios locais
- **Open Graph** para redes sociais
- **Otimização de imagens** automática
- **Lazy loading** de componentes
- **Cache estratégico** de consultas

## 🚀 Deploy

O projeto está configurado para deploy automático no Replit Deployments:

1. Configure as variáveis de ambiente
2. Execute o build de produção
3. O servidor Express serve tanto o frontend quanto a API

## 📞 Contato

**Luka Eventos**
- 📱 WhatsApp: (91) 98155-3464
- 📧 Email: contato@lukaeventos.com.br
- 🌐 Website: [lukaeventos.com.br](https://lukaeventos.com.br)
- 📍 Belém, PA - Brasil

## 📄 Licença

Este projeto é propriedade da Luka Eventos. Todos os direitos reservados.

---

Desenvolvido com ❤️ para criar experiências memoráveis em eventos corporativos.