# Configuração SSL via Vercel - Guia Completo

## Data: 30/07/2025 00:45

## Por que Vercel para SSL?
- **SSL automático** para domínios personalizados
- **Deploy simples** direto do GitHub/Git
- **CDN global** Edge Network incluso
- **Zero configuração** para certificados
- **Renovação automática** Let's Encrypt

## Passo a Passo Completo

### 1. Preparar Repositório
```bash
# Seu código já está pronto para Vercel
# Vercel detecta automaticamente projetos Node.js/React
```

### 2. Criar Conta Vercel
1. Ir para https://vercel.com
2. Clicar "Sign Up"
3. **Conectar com GitHub** (recomendado) ou email
4. Verificar conta

### 3. Fazer Deploy do Projeto
```bash
# Opção A: Via dashboard Vercel
1. Clicar "New Project"
2. Importar repositório GitHub
3. Configurar build settings (automático para Node.js)
4. Fazer deploy

# Opção B: Via CLI (mais rápido)
npm i -g vercel
vercel login
vercel --prod
```

### 4. Adicionar Domínio Personalizado
1. No dashboard do projeto, ir para "Settings"
2. Clicar "Domains"
3. Adicionar domínios:
   ```
   lukaeventos.com.br
   www.lukaeventos.com.br
   ```

### 5. Configurar DNS (No Registrador do Domínio)
O Vercel fornecerá configurações DNS específicas:

```dns
# Configuração A (Mais comum)
Type    Name                    Value
A       lukaeventos.com.br      76.76.19.61 (IP da Vercel)
CNAME   www                     cname.vercel-dns.com

# Ou configuração CNAME (Alternativa)
Type    Name                    Value  
CNAME   lukaeventos.com.br      cname.vercel-dns.com
CNAME   www                     cname.vercel-dns.com
```

### 6. SSL Automático
- **Vercel emite automaticamente** certificados Let's Encrypt
- **Inclui ambos domínios**: lukaeventos.com.br e www.lukaeventos.com.br
- **Renovação automática** a cada 60 dias
- **Ativação**: 5-15 minutos após DNS configurado

### 7. Configurar Redirecionamentos (vercel.json)
Criar arquivo `vercel.json` na raiz do projeto:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "redirects": [
    {
      "source": "https://www.lukaeventos.com.br/(.*)",
      "destination": "https://lukaeventos.com.br/$1",
      "permanent": true
    },
    {
      "source": "http://lukaeventos.com.br/(.*)",
      "destination": "https://lukaeventos.com.br/$1", 
      "permanent": true
    },
    {
      "source": "http://www.lukaeventos.com.br/(.*)",
      "destination": "https://lukaeventos.com.br/$1",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 8. Build Settings Otimizadas
```json
{
  "functions": {
    "server/index.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ]
}
```

## Configuração para Projeto Full-Stack

### Structure Expected by Vercel
```
projeto/
├── vercel.json          # Configurações Vercel
├── package.json         # Scripts de build
├── client/             # Frontend React
│   ├── dist/           # Build output
│   └── src/
├── server/             # Backend Express  
│   └── index.ts
└── public/             # Assets estáticos
```

### Scripts package.json
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && npm run build",
    "build:server": "cd server && npm run build", 
    "dev": "npm run dev:server",
    "start": "node server/dist/index.js"
  }
}
```

## Vantagens Vercel vs Cloudflare

### ✅ Vantagens Vercel
- **SSL automático** sem configuração
- **Deploy simples** via Git
- **Serverless functions** incluídas
- **Preview deployments** para branches
- **Analytics built-in**
- **Zero downtime** deployments

### ⚠️ Considerações Vercel
- **Pricing**: Gratuito até 100GB bandwidth/mês
- **Vendor lock-in**: Mais difícil migrar depois
- **Cold starts**: Serverless functions podem ter latência

### 🔄 Comparação Rápida

| Recurso | Vercel | Cloudflare |
|---------|--------|------------|
| SSL Automático | ✅ | ✅ |
| Setup Complexidade | Baixa | Média |
| CDN Global | ✅ | ✅ |
| Serverless | ✅ | ❌ |
| DDoS Protection | Básica | Avançada |
| Analytics | ✅ | ✅ |
| Custo | Freemium | Freemium |

## Timeline de Implementação Vercel

```
Hora 0: Criar conta e conectar repo (5 min)
Hora 0: Primeiro deploy automático (2-5 min)
Hora 0: Adicionar domínios custom (2 min)
Hora 0-2: Configurar DNS no registrador (5 min)
Hora 2-24: Propagação DNS mundial
Hora 24: SSL certificado ativo para ambos domínios
```

## Configuração DNS Detalhada

### No Registrador do Domínio (Onde foi comprado)
1. **Encontrar seção DNS/Zone Editor**
2. **Remover registros existentes** para lukaeventos.com.br
3. **Adicionar novos registros**:
   ```
   A    lukaeventos.com.br    76.76.19.61
   CNAME www               cname.vercel-dns.com
   ```
4. **Salvar alterações**
5. **Aguardar propagação** (TTL dependent)

### Verificação DNS
```bash
# Verificar se aponta para Vercel
dig lukaeventos.com.br
dig www.lukaeventos.com.br

# Deve retornar IPs da Vercel (76.76.19.x)
```

## Monitoramento e Validação

### Ferramentas de Teste
```bash
# Teste SSL
curl -I https://lukaeventos.com.br
curl -I https://www.lukaeventos.com.br

# Verificação detalhada
openssl s_client -connect lukaeventos.com.br:443
```

### Online Tools
- **SSL Check**: https://www.ssllabs.com/ssltest/
- **DNS Check**: https://www.whatsmydns.net/
- **Speed Test**: https://pagespeed.web.dev/

## Custo Estimado

### Vercel Hobby (Gratuito)
- **Bandwidth**: 100GB/mês
- **Serverless Functions**: 100GB-hours/mês
- **Domains**: Ilimitados
- **SSL**: Incluso
- **Builds**: 6,000 minutos/mês

### Vercel Pro ($20/mês)
- **Bandwidth**: 1TB/mês  
- **Functions**: 1,000 GB-hours/mês
- **Analytics**: Avançado
- **Support**: Email

## Configurações de Segurança Vercel

### Automatic HTTPS
- **Force HTTPS**: Ativado por padrão
- **HSTS**: Configurável via headers
- **Certificate**: Let's Encrypt automático

### Additional Security
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "index, follow"
        },
        {
          "key": "Referrer-Policy", 
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

## Resultado Final

Após configuração completa via Vercel:
1. **https://lukaeventos.com.br** ✅ Funcionará perfeitamente
2. **https://www.lukaeventos.com.br** ✅ Redirecionará automaticamente  
3. **SSL válido** para ambos domínios
4. **Auditoria SEO** mostrará 0 páginas com 4XX
5. **Performance otimizada** com CDN global

## Próximos Passos

1. **Decidir**: Vercel ou Cloudflare baseado nas necessidades
2. **Preparar repo**: Código já está pronto
3. **Configurar DNS**: Alterar registros no registrador
4. **Deploy**: Fazer deploy inicial
5. **Testar**: Verificar ambos domínios funcionando
6. **Monitorar**: Usar ferramentas de verificação SSL

**Recomendação**: Vercel é mais simples para projetos full-stack, enquanto Cloudflare oferece mais controle de infraestrutura.